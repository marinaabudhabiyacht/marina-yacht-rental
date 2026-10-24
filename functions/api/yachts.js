export async function onRequestGet({env}) {
  const base=(env.SUPABASE_URL||'').replace(/\/$/,'');
  const key=env.SUPABASE_PUBLISHABLE_KEY;
  if(!base||!key)return Response.json({error:'Database connection not configured'},{status:503,headers:{'Cache-Control':'no-store'}});
  try {
    const response=await fetch(base+'/rest/v1/yachts?select=*,yacht_images(*)&is_active=eq.true&order=created_at.asc',{headers:{apikey:key,Authorization:'Bearer '+key}});
    if(!response.ok)return Response.json({error:'Unable to load yachts'},{status:502,headers:{'Cache-Control':'no-store'}});
    const data=await response.json();
    return Response.json(data,{headers:{'Cache-Control':'public, max-age=30','Access-Control-Allow-Origin':'*'}});
  } catch {
    return Response.json({error:'Database temporarily unavailable'},{status:502,headers:{'Cache-Control':'no-store'}});
  }
}