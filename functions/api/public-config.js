export async function onRequestGet({env}) {
const key=env.SUPABASE_PUBLISHABLE_KEY;
if(!key||!key.startsWith('sb_publishable_'))return Response.json({error:'Configuration unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
return Response.json({supabasePublishableKey:key},{headers:{'Cache-Control':'public, max-age=300'}});
}