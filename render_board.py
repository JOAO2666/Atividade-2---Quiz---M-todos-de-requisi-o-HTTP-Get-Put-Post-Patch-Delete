import asyncio
import os
from playwright.async_api import async_playwright
from PIL import Image

async def main():
    cwd = os.path.abspath(os.path.dirname(__file__))
    html_file = os.path.join(cwd, "quadro_trello_exoapi.html")
    png_file = os.path.join(cwd, "quadro_trello_exoapi.png")
    jpg_file = os.path.join(cwd, "quadro_trello_exoapi.jpg")
    file_url = f"file:///{html_file.replace(os.sep, '/')}"

    print(f"Opening: {file_url}")
    async with async_playwright() as p:
        # Launch using installed msedge
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(
            viewport={"width": 1750, "height": 980},
            device_scale_factor=1.5
        )
        page = await context.new_page()
        await page.goto(file_url, wait_until="load")
        await page.wait_for_timeout(1000)

        # Screenshot PNG
        await page.screenshot(path=png_file, full_page=True)
        print(f"PNG screenshot saved to: {png_file}")
        await browser.close()

    # Convert/save to JPG with high quality
    if os.path.exists(png_file):
        with Image.open(png_file) as im:
            rgb_im = im.convert("RGB")
            rgb_im.save(jpg_file, "JPEG", quality=95)
            print(f"JPG image saved to: {jpg_file}")

if __name__ == "__main__":
    asyncio.run(main())

