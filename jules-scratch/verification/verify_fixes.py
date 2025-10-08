from playwright.sync_api import sync_playwright, expect

def run_verification(page):
    """
    Verifies the key functionalities of the PigMap application.
    """
    # 1. Navigate to the app and wait for the map to load
    page.goto("http://127.0.0.1:8787")
    expect(page.locator("#map .ol-layer canvas")).to_be_visible(timeout=15000)

    # Wait for the initial markers to load
    page.wait_for_selector(".ol-layer canvas", state="visible")

    # 2. Verify search functionality
    page.locator("#searchInput").fill("Kansas City")

    # The search results dropdown should appear
    search_results = page.locator("#searchResults")
    expect(search_results).to_be_visible()

    # Click the first result
    first_result = search_results.locator(".search-result-item").first
    # Use to_contain_text for a less brittle assertion
    expect(first_result).to_contain_text("Kansas City", timeout=10000)
    first_result.click()

    # The dropdown should disappear after selection
    expect(search_results).not_to_be_visible()

    # 3. Verify adding a marker
    page.locator("#addBtn").click()

    # Click on the map to place the marker
    page.locator("#map").click(position={"x": 400, "y": 300})

    # Fill out the modal
    modal = page.locator(".modal-content")
    expect(modal).to_be_visible()
    modal.locator("#markerType").select_option("PIG")
    modal.locator("#markerTitle").fill("Test PIG Marker")
    modal.locator("#markerDesc").fill("This is a test description.")

    # Save the marker
    modal.get_by_role("button", name="Save").click()

    # The modal should close
    expect(modal).not_to_be_visible()

    # A success toast should appear
    expect(page.locator(".toast-success")).to_be_visible()
    expect(page.locator(".toast-success")).to_have_text("Report saved successfully!")

    # 4. Take a final screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_verification(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()