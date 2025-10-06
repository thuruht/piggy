export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'no-referrer'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      // Handle API routes first
      if (url.pathname.startsWith('/api/')) {
        if (url.pathname === '/api/upload-url') {
          return handleUploadUrl(request, env, headers);
        }

        if (url.pathname === '/api/markers') {
          return request.method === 'GET' 
            ? getMarkers(env, headers)
            : saveMarker(request, env, headers);
        }

        if (url.pathname.startsWith('/api/markers/')) {
          const id = url.pathname.split('/')[3];
          return deleteMarker(id, env, headers);
        }

        if (url.pathname === '/api/comments') {
          return saveComment(request, env, headers);
        }

        if (url.pathname.startsWith('/api/comments/')) {
          const markerId = url.pathname.split('/')[3];
          return getComments(markerId, env, headers);
        }

        return new Response(JSON.stringify({ error: 'API endpoint not found' }), { 
          status: 404, 
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
      }
      
      // For non-API routes, serve static assets
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { 
        status: 500, 
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }
  }
};

async function handleUploadUrl(request, env, headers) {
  try {
    const { filename, contentType } = await request.json();
    
    const key = `media/${Date.now()}-${Math.random().toString(36).substring(2)}-${filename}`;
    const uploadUrl = await env.LIVESTOCK_MEDIA.createPresignedUrl(key, {
      method: 'PUT',
      expires: 3600,
      headers: { 'Content-Type': contentType }
    });

    return new Response(JSON.stringify({ uploadUrl }), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload URL error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate upload URL' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}

async function getMarkers(env, headers) {
  try {
    const markers = await env.PIGMAP_CONFIG.get('markers', 'json') || [];
    return new Response(JSON.stringify(markers), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get markers error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch markers' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}

async function saveMarker(request, env, headers) {
  try {
    const marker = await request.json();
    
    if (!marker.title || !marker.type || !marker.coords) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400, 
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }
    
    marker.id = crypto.randomUUID();
    marker.timestamp = new Date().toISOString();
    marker.title = marker.title.substring(0, 200);
    marker.description = (marker.description || '').substring(0, 1000);
    
    const markers = await env.PIGMAP_CONFIG.get('markers', 'json') || [];
    markers.push(marker);
    
    await env.PIGMAP_CONFIG.put('markers', JSON.stringify(markers));
    
    try {
      const durableId = env.LIVESTOCK_REPORTS.idFromName('tracker');
      const durableStub = env.LIVESTOCK_REPORTS.get(durableId);
      await durableStub.fetch('http://tracker/broadcast', {
        method: 'POST',
        body: JSON.stringify({ type: 'marker_added', marker })
      });
    } catch (broadcastError) {
      console.warn('Broadcast failed:', broadcastError);
    }

    return new Response(JSON.stringify({ success: true, id: marker.id }), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Save marker error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save marker' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}

async function deleteMarker(id, env, headers) {
  try {
    const markers = await env.PIGMAP_CONFIG.get('markers', 'json') || [];
    const filtered = markers.filter(m => m.id !== id);
    
    await env.PIGMAP_CONFIG.put('markers', JSON.stringify(filtered));
    
    return new Response(JSON.stringify({ success: true }), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete marker error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete marker' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}

async function saveComment(request, env, headers) {
  try {
    const comment = await request.json();
    
    if (!comment.text || !comment.markerId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400, 
        headers: { ...headers, 'Content-Type': 'application/json' }
      });
    }
    
    comment.id = crypto.randomUUID();
    comment.timestamp = new Date().toISOString();
    comment.text = comment.text.substring(0, 500);
    comment.author = (comment.author || 'Anonymous').substring(0, 50);
    
    const comments = await env.PIGMAP_CONFIG.get('comments', 'json') || [];
    comments.push(comment);
    
    await env.PIGMAP_CONFIG.put('comments', JSON.stringify(comments));
    
    return new Response(JSON.stringify({ success: true, id: comment.id }), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Save comment error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save comment' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}

async function getComments(markerId, env, headers) {
  try {
    const comments = await env.PIGMAP_CONFIG.get('comments', 'json') || [];
    const filtered = comments.filter(c => c.markerId === markerId);
    
    return new Response(JSON.stringify(filtered), { 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), { 
      status: 500, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}



export class LivestockReport {
  constructor(state, env) {
    this.state = state;
    this.sessions = new Set();
  }

  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      
      this.sessions.add(server);
      
      server.addEventListener('close', () => {
        this.sessions.delete(server);
      });
      
      return new Response(null, { status: 101, webSocket: client });
    }
    
    if (url.pathname === '/broadcast') {
      const data = await request.json();
      this.broadcast(data);
      return new Response('OK');
    }
    
    return new Response('Not Found', { status: 404 });
  }
  
  broadcast(data) {
    this.sessions.forEach(session => {
      try {
        session.send(JSON.stringify(data));
      } catch (error) {
        this.sessions.delete(session);
      }
    });
  }
}