const RECORD_TYPES = [
  { type: 'A', id: 1 },
  { type: 'AAAA', id: 28 },
  { type: 'CAA', id: 257 },
  { type: 'CDS', id: 59 },
  { type: 'CERT', id: 37 },
  { type: 'CNAME', id: 5 },
  { type: 'DNAME', id: 39 },
  { type: 'DNSKEY', id: 48 },
  { type: 'DS', id: 43 },
  { type: 'HINFO', id: 13 },
  { type: 'IPSECKEY', id: 45 },
  { type: 'MX', id: 15 },
  { type: 'NAPTR', id: 35 },
  { type: 'NS', id: 2 },
  { type: 'NSEC', id: 47 },
  { type: 'NSEC3PARAM', id: 51 },
  { type: 'PTR', id: 12 },
  { type: 'RP', id: 17 },
  { type: 'RRSIG', id: 46 },
  { type: 'SOA', id: 6 },
  { type: 'SPF', id: 99 },
  { type: 'SRV', id: 33 },
  { type: 'SSHFP', id: 44 },
  { type: 'TLSA', id: 52 },
  { type: 'TXT', id: 16 },
  { type: 'WKS', id: 11 },
];

const RECORD_TYPES_BY_ID = RECORD_TYPES
  .reduce((types, record) => Object.assign(types, { [record.id]: record.type }), {});

const API_URL_ROOT = 'https://dns.google.com/resolve';

module.exports = {
  API_URL_ROOT,
  RECORD_TYPES,
  RECORD_TYPES_BY_ID,
};