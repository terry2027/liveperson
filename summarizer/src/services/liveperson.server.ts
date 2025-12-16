// src/services/liveperson.server.ts

/**
 * Retrieves the base domain for the Messaging History API.
 * @param {string} accountId - Your LivePerson Account ID.
 * @returns {Promise<string>} The base domain for the API.
 */
async function getMessagingHistoryDomain(accountId: string): Promise<string> {
  const domainApiUrl = `https://api.liveperson.net/api/account/${accountId}/service/msgHist/baseURI.json?version=1.0`;
  
  try {
    const response = await fetch(domainApiUrl);
    if (!response.ok) {
      throw new Error(`Domain API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    
    const msgHistBaseURI = data.baseURIs?.find((uri: any) => uri.service === "msgHist")?.baseURI;
    
    if (msgHistBaseURI) {
      return `https://${msgHistBaseURI}`;
    }
    throw new Error("Failed to retrieve msgHist domain from LivePerson API.");
  } catch (error) {
    console.error("Domain API error:", error);
    throw error;
  }
}

/**
 * Retrieves the transcript of a specific conversation.
 * This MUST be executed on a backend server.
 * @param {string} conversationId - The ID of the conversation.
 * @param {string} accountId - Your LivePerson Account ID.
 * @param {string} authToken - The secure Bearer Token.
 * @returns {Promise<any>} The conversation transcript data.
 */
export async function retrieveConversationTranscript(conversationId: string, accountId: string, authToken: string): Promise<any> {
  if (!conversationId || !accountId || !authToken) {
    throw new Error("Missing conversationId, accountId, or authToken.");
  }

  const baseDomain = await getMessagingHistoryDomain(accountId);
  const apiUrl = `${baseDomain}/messaging_history/api/account/${accountId}/conversations/conversation/search`;

  const requestBody = {
    "conversationId": conversationId,
    "contentToRetrieve": ["messageRecords"],
    "source": "NextJS_Transcript_App"
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      // Log the response body for more detailed error info if possible
      const errorBody = await response.text();
      console.error("LivePerson API Error Body:", errorBody);
      throw new Error(`LivePerson API call failed with status: ${response.status}`);
    }

    const transcriptData = await response.json();
    console.log("Transcript Retrieved successfully");
    return transcriptData;
    
  } catch (error) {
    console.error("Error retrieving transcript:", error);
    // Re-throw the error to be handled by the API route
    throw error;
  }
}
