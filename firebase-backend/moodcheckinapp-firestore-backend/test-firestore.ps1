# -------------------------------
# Firebase Firestore - Read Moods
# -------------------------------

# Your Firebase Web API Key
$apiKey = "AIzaSyCV4VurTFcQJu_45cOg3BoRThlVUH_CjtE"

# Your Firebase project ID
$projectId = "moodcheckinapp"

# Firestore REST API URL for 'moods' collection
$databaseUrl = "https://firestore.googleapis.com/v1/projects/moodcheckinapp/databases/(default)/documents/moods"

# Make GET request to Firestore
$response = Invoke-RestMethod -Uri "https://firestore.googleapis.com/v1/projects/moodcheckinapp/databases/(default)/documents/moods?key=AIzaSyCV4VurTFcQJu_45cOg3BoRThlVUH_CjtE" -Method Get -Headers @{
    "Content-Type" = "application/json"
}

# Display the moods
if ($response.documents) {
    Write-Host "`n--- Mood Records Found ---`n"
    foreach ($doc in $response.documents) {
        $mood = $doc.fields.mood.stringValue
        $note = $doc.fields.note.stringValue
        $timestamp = $doc.fields.timestamp.timestampValue
        $user_id = $doc.fields.user_id.stringValue

        Write-Host "Mood: $mood"
        Write-Host "Note: $note"
        Write-Host "User ID: $user_id"
        Write-Host "Time: $timestamp"
        Write-Host "-----------------------------"
    }
} else {
    Write-Host "😢 No mood records found!"
}
