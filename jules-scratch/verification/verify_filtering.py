from playwright.sync_api import Page, expect

def test_filtering(page: Page):
    """
    This test verifies that the filtering UI works as expected.
    """
    # 1. Arrange: Go to the application.
    page.goto("http://localhost:8787")

    # 2. Act: Select the "Archived" filter.
    status_filter = page.locator("#statusFilter")
    status_filter.select_option("archived")

    # 3. Assert: Wait for the map to be stable.
    expect(page.locator("#map")).to_be_visible()

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/filtering.png")