export interface OrderDetails {
  quantity: number;
  pricePerUnit: number;
  deliveryCharge: number;
  gst: number;
  total: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  addressLine: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface BookSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge: string;
  description: string;
}

export interface SavedOrder {
  orderId: string;
  timestamp: string;
  quantity: number;
  total: number;
  customerName: string;
  phoneNumber: string;
  city: string;
  state: string;
  addressLine: string;
  pincode: string;
  upiId: string;
  status: 'Pending Verification' | 'Payment Recorded' | 'Ready for Dispatch' | 'Dispatched';
}

export const PERMANENT_SITE_URL = 'https://finsakhi.ai.studio/';
export const PERMANENT_COVER_URL = 'https://finsakhi.ai.studio/og-cover.jpg';

