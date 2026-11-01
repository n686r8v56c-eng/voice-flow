import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const configured=Boolean(url&&key&&!url.includes('YOUR_PROJECT'));
export const supabase=configured?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
export async function fetchData(userId){const {data,error}=await supabase.from('voice_flow_data').select('payload').eq('user_id',userId).maybeSingle();if(error)throw error;return data?.payload||null}
export async function pushData(userId,payload){const {error}=await supabase.from('voice_flow_data').upsert({user_id:userId,payload,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error}
export async function uploadAudio(userId,blob){const ext=blob.type.includes('mp4')?'m4a':blob.type.includes('ogg')?'ogg':'webm';const path=`${userId}/${crypto.randomUUID()}.${ext}`;const {error}=await supabase.storage.from('voice-recordings').upload(path,blob,{contentType:blob.type||'audio/webm'});if(error)throw error;return path}
export async function audioUrl(path){const {data,error}=await supabase.storage.from('voice-recordings').createSignedUrl(path,3600);if(error)throw error;return data.signedUrl}
