const API_KEY = import.meta.env.VITE_EV_API_KEY;
const API_URL = import.meta.env.VITE_EV_API_URL;
const APP_UUID = import.meta.env.VITE_EV_APP_ID;

interface CardDetails {
  number: string;
  expiry: {
    month: string;
    year: string;
  };
}

interface ThreeDsSessionRequest {
  card: CardDetails;
  merchant: {
    name: string;
    website: string;
    categoryCode: string;
    country: string;
  };
  acquirer: {
    bin: string;
    merchantIdentifier: string;
    country: string;
  };
  payment: {
    type: string;
    amount: number;
    currency: string;
  };
}

interface ECIDetails {
    descriptor: string;
    value: string;
    liabilityShift: string;
  }
  
export interface ThreeDsSession {
    id: string;
    status: string;
    cryptogram: string;
    eci: ECIDetails;
}

// Helper function to create request body
const createRequestBody = (cardNumber: string, expiryMonth: string, expiryYear: string): ThreeDsSessionRequest => ({
  card: {
    number: cardNumber,
    expiry: {
      month: expiryMonth,
      year: expiryYear,
    }
  },
  merchant: {
    name: "Ollivanders Wand Shop",
    website: "https://www.ollivanders.co.uk",
    categoryCode: "5945",
    country: "ie"
  },
  acquirer: {
    bin: "414141",
    merchantIdentifier: "18463590293743",
    country: "ie"
  },
  payment: {
    type: "one-off",
    amount: 12300,
    currency: "eur"
  }
});

// Helper function for Basic Auth header
const getBasicAuthHeader = (): string => {
  if (!APP_UUID || !API_KEY) {
    throw new Error("APP_UUID or API_KEY is not defined in environment variables");
  }
  return `Basic ${btoa(`${APP_UUID}:${API_KEY}`)}`;
};

export const create3DSSession = async (cardNumber: string, expiryMonth: string, expiryYear: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/payments/3ds-sessions`, {
      method: "POST",
      headers: { 
        "Authorization": getBasicAuthHeader(), 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(createRequestBody(cardNumber, expiryMonth, expiryYear))
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    const session: ThreeDsSession = await response.json();
    if (!session.id) {
      throw new Error("No session ID returned");
    }

    console.log("Session created", session);
    return session.id;
  } catch (error) {
    console.error("Error creating 3DS session:", error);
    throw error;
  }
};


export const get3DSSession = async (sessionId: string): Promise<ThreeDsSession> => {
  try {
    const response = await fetch(`${API_URL}/payments/3ds-sessions/${sessionId}`, {
      headers: { "Authorization": getBasicAuthHeader() }
    });

    if (!response.ok) {
      throw new Error(`Failed to get session: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting 3DS session:", error);
    throw error;
  }
};
