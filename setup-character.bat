@echo off
echo ========================================
echo   Character Image Setup Script
echo ========================================
echo.

REM Create the directory structure
echo Creating folder structure...
if not exist "public\assets\character" mkdir "public\assets\character"
echo ✓ Folder created: public\assets\character
echo.

echo ========================================
echo   AUTO-DETECTING CHARACTER IMAGE
echo ========================================
echo.

REM Try to find and copy the anime character (preferred)
if exist "c:\Users\jogen\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1775025647330-4whr668q.png" (
    echo ✓ Found ANIME CHARACTER with pink cap!
    echo   Copying cute anime-style character...
    copy "c:\Users\jogen\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1775025647330-4whr668q.png" "public\assets\character\boy-neutral.png"
    echo ✓ Anime character copied successfully!
    echo.
    goto :verify
)

REM Fallback to the first character
if exist "c:\Users\jogen\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1775024434923-jfvpjhkv.png" (
    echo ✓ Found 3D character image!
    echo   Copying 3D character...
    copy "c:\Users\jogen\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1775024434923-jfvpjhkv.png" "public\assets\character\boy-neutral.png"
    echo ✓ Character image copied successfully!
    echo.
    goto :verify
)

echo ⚠ Could not auto-detect character image.
echo.
echo ========================================
echo   MANUAL STEP REQUIRED
echo ========================================
echo.
echo Please copy your character image to:
echo   %CD%\public\assets\character\boy-neutral.png
echo.
echo The image should be:
echo   - Format: PNG (transparent/white background)
echo   - Size: At least 400x600 pixels
echo   - Name: boy-neutral.png (exact name)
echo.

:verify

REM Verify the file exists
if exist "public\assets\character\boy-neutral.png" (
    echo ========================================
    echo   ✓ SETUP COMPLETE!
    echo ========================================
    echo.
    echo Your character image is ready!
    echo.
    echo Next steps:
    echo   1. Run: npm run dev
    echo   2. Open: http://localhost:5173/login
    echo   3. Enjoy your animated character!
    echo.
) else (
    echo ========================================
    echo   ⚠ SETUP INCOMPLETE
    echo ========================================
    echo.
    echo The image file was not found.
    echo Please manually copy your character image to:
    echo   %CD%\public\assets\character\boy-neutral.png
    echo.
)

pause
