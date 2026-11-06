import type { Business, Service } from './types';
export function WebsiteBridge({business,service,te}:{business:Business;service?:Service;te:boolean}) {
  const target = business.customerPortalUrl;
  if (!target) return null;
  let login: URL;
  try { login=new URL(target); if(!['http:','https:'].includes(login.protocol))return null; } catch {return null;}
  login.searchParams.set('portal','customer');
  const request=new URL(login);request.searchParams.set('intent','request');
  if(service)request.searchParams.set('service',service.name.en);
  const academy=new URL(login);academy.searchParams.set('intent','request');academy.searchParams.set('division','academy');
  return <nav aria-label="Customer portal" style={{padding:'18px 5%',borderTop:'1px solid #d8bb7d26',display:'flex',alignItems:'center',gap:'12px 24px',flexWrap:'wrap',fontSize:13,lineHeight:1.6}}>
    <a className="text-link" href={login.href}>{te?'నా అప్లికేషన్స్ / లాగిన్':'My Applications / Login'}</a>
    <a className="text-link" href={request.href}>{te?'సర్వీస్ రిక్వెస్ట్':'Service Request'}</a>
    <a className="text-link" href={academy.href}>{te?'అకాడమీ అడ్మిషన్':'Academy Admission'}</a>
    <small>{te?'రిజిస్టర్ చేసి login అయితే notifications, మీ application status, సంబంధిత updates చూడవచ్చు.':'Register and log in to view notifications, your application status and relevant updates.'}</small>
  </nav>;
}
