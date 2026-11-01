import React from 'react';
import {House,BookOpen,Library,Mic,ChartNoAxesColumn,Settings,Plus,Trash2,ChevronRight,Play,Pause,Square,Repeat2,Download,Video,Headphones} from 'lucide-react';
export const icons={home:House,training:Library,reading:BookOpen,record:Mic,analysis:ChartNoAxesColumn,settings:Settings,plus:Plus,trash:Trash2,arrow:ChevronRight,play:Play,pause:Pause,stop:Square,repeat:Repeat2,download:Download,video:Video,audio:Headphones};
export function I({name,size=17,...props}){const C=icons[name]||BookOpen;return <C size={size} strokeWidth={1.8} {...props}/>}
