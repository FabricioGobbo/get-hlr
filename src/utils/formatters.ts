export const formatMSISDN = (msisdn: string): string => {
  const cleaned = msisdn.replace(/\D/g, '');
  
  if (cleaned.length === 13) {
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  return msisdn;
};

export const formatIMSI = (imsi: string): string => {
  if (imsi.length === 15) {
    return `${imsi.slice(0, 3)} ${imsi.slice(3, 5)} ${imsi.slice(5, 11)} ${imsi.slice(11)}`;
  }
  return imsi;
};

export const formatICCID = (iccid: string): string => {
  if (iccid.length >= 19) {
    return `${iccid.slice(0, 2)} ${iccid.slice(2, 6)} ${iccid.slice(6, 10)} ${iccid.slice(10, 14)} ${iccid.slice(14)}`;
  }
  return iccid;
};
