param(
    [string]$pathToAndroidManifest
)
Write-Debug "Entering extract-android-version task"
Write-Debug "pathToAndroidManifest = $pathToAndroidManifest"

$pathToAndroidManifest= $pathToAndroidManifest.Trim()

$filePath = $pathXamarinAndroidManifest
$xml = [xml]$(Get-Content $filePath -Encoding UTF8)

Set-TaskVariable -Variable "$VERSION_NAME" -Value $xml.manifest.versionName
Set-TaskVariable -Variable "$VERSION_CODE" -Value $xml.manifest.versionCode

Write-Debug "output variable ($VERSION_NAME) = $xml.manifest.versionName"
Write-Debug "output variable ($VERSION_CODE) = $xml.manifest.versionCode"

Write-Debug "Successfully extracted app versionName and versionCode."