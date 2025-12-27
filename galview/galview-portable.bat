@echo off
setlocal ENABLEDELAYEDEXPANSION

REM ─────────────────────────────
REM Config
REM ─────────────────────────────
set TEMPLATE_URL=https://piapandora.com/galview/template.html
set HTML_FILE=galview.html
set TEMP_FILE=_galview_tmp.html

echo Downloading GalView template...
powershell -Command ^
  "Invoke-WebRequest '%TEMPLATE_URL%' -OutFile '%HTML_FILE%'"

if not exist "%HTML_FILE%" (
    echo ERROR: Failed to download GalView template
    pause
    exit /b
)

echo Template downloaded.

REM ─────────────────────────────
REM Build images array in memory
REM ─────────────────────────────
set IMG_JS=const images = [

set count=0
for %%f in (*.png *.jpg *.jpeg *.webp *.gif *.bmp) do set /a count+=1

set idx=0
for %%f in (*.png *.jpg *.jpeg *.webp *.gif *.bmp) do (
    set /a idx+=1
    if !idx! EQU !count! (
        set IMG_JS=!IMG_JS!"%%f"
    ) else (
        set IMG_JS=!IMG_JS!"%%f",
    )
)

set IMG_JS=!IMG_JS!];

REM ─────────────────────────────
REM Inject into HTML
REM ─────────────────────────────
(
for /f "usebackq delims=" %%L in ("%HTML_FILE%") do (
    if "%%L"=="<!-- IMAGES_ARRAY_PLACEHOLDER -->" (
        echo ^<script^>
        echo !IMG_JS!
        echo ^</script^>
    ) else (
        echo %%L
    )
)
) > "%TEMP_FILE%"

move /Y "%TEMP_FILE%" "%HTML_FILE%" >nul

REM ─────────────────────────────
REM Launch
REM ─────────────────────────────
echo Done! Launching GalView...
start "" "%HTML_FILE%"
exit
