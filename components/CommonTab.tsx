import React from 'react';
import { DeviceType } from '../types';
import { Sliders, Volume2, Globe, Keyboard, CreditCard } from 'lucide-react';

interface CommonTabProps {
  deviceType: DeviceType;
}

const CommonTab: React.FC<CommonTabProps> = ({ deviceType }) => {
  const isMSR = deviceType === DeviceType.MSR || deviceType === DeviceType.MSR_IBUTTON;
  const isIButton = deviceType === DeviceType.IBUTTON || deviceType === DeviceType.MSR_IBUTTON;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 border-b border-gray-300 px-6 py-3">
        <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
          <Sliders size={20} className="text-gray-500" />
          Common Configuration
        </h2>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* System Section */}
          <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">System</span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Keyboard size={14} /> Interface
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                   onChange={(e) => {
                     // TODO + _ +
                   }}
                 >
                    <option>USB keyboard mode</option>
                    <option>USB HID Vendor mode</option>
                    <option>RS232 mode</option>
                 </select>
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Volume2 size={14} /> Buzzer
                 </label>
                 <div className="flex items-center gap-4 mt-2">
                   <label className="flex items-center gap-2 text-sm text-gray-600">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       defaultChecked 
                       className="text-blue-600 focus:ring-blue-500" 
                       onChange={(e) => {
                         // TODO + _ +
                       }}
                     /> ON
                   </label>
                   <label className="flex items-center gap-2 text-sm text-gray-600">
                     <input 
                       type="radio" 
                       name="buzzer" 
                       className="text-blue-600 focus:ring-blue-500" 
                       onChange={(e) => {
                         // TODO + _ +
                       }}
                     /> OFF
                   </label>
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <Globe size={14} /> Language
                 </label>
                 <select 
                   className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                   onChange={(e) => {
                     // TODO + _ +
                   }}
                 >
                    <option>USA English</option>
                    <option>Spanish</option>
                    <option>Danish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Italian</option>
                    <option>Norwegian</option>
                    <option>Swedish</option>
                    <option>Herbrew</option>
                    <option>Turkiye</option>
                 </select>
               </div>
            </div>
          </section>

          {/* i-Button Section */}
          {isIButton && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
               <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">i-Button / Code Sticks</span>
              </div>
              <div className="p-4 grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mode</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      onChange={(e) => {
                        // TODO + _ +
                      }}
                    >
                        <option>zero-16 times</option>
                        <option>F12</option>
                        <option>zero-7 times</option>
                        <option>Code stick protocol</option>
                        <option>user definition</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Key Range</label>
                    <div className="flex items-center gap-2">
                       <input type="number" defaultValue={0} className="w-20 border-gray-300 rounded text-sm p-2 bg-gray-50 border" />
                       <span className="text-gray-400">~</span>
                       <input type="number" defaultValue={15} className="w-20 border-gray-300 rounded text-sm p-2 bg-gray-50 border" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MSR Section */}
          {isMSR && (
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">MSR</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Direction</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      onChange={(e) => {
                        // TODO + _ +
                      }}
                    >
                        <option>Bidirectional</option>
                        <option>Forward</option>
                        <option>Backward</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Track Order</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      onChange={(e) => {
                        // TODO + _ +
                      }}
                    >
                        <option>123</option>
                        <option>132</option>
                        <option>213</option>
                        <option>231</option>
                        <option>312</option>
                        <option>321</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Reset Interval</label>
                    <select 
                      className="w-full border-gray-300 rounded text-sm p-2 bg-gray-50 border"
                      onChange={(e) => {
                        // TODO + _ +
                      }}
                    >
                        <option>0(default, 03:22)</option>
                        <option>16(06:43)</option>
                        <option>32(13:27)</option>
                        <option>48(20:10)</option>
                        <option>64(26:53)</option>
                        <option>80(33:36)</option>
                        <option>96(40:19)</option>
                        <option>112(47:03)</option>
                        <option>128(53:46)</option>
                        <option>144(01:00:29)</option>
                        <option>160(01:07:12)</option>
                        <option>176(01:13:55)</option>
                        <option>192(01:20:39)</option>
                        <option>208(01:27:22)</option>
                        <option>224(01:34:05)</option>
                        <option>240(disable)</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700 block mb-2">Enable ISO</label>
                   <div className="flex flex-wrap gap-4">
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="rounded text-blue-600 focus:ring-blue-500" 
                          onChange={(e) => {
                            // TODO + _ +
                          }}
                        /> Enable ISO1
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="rounded text-blue-600 focus:ring-blue-500" 
                          onChange={(e) => {
                            // TODO + _ +
                          }}
                        /> Enable ISO2
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="rounded text-blue-600 focus:ring-blue-500" 
                          onChange={(e) => {
                            // TODO + _ +
                          }}
                        /> Enable ISO3
                     </label>
                   </div>
                 </div>

                 <div className="space-y-2 md:col-span-2 border-t pt-4 mt-2">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Global pre/suffix sending condition</label>
                          <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm text-gray-700">
                               <input 
                                 type="radio" 
                                 name="global_send" 
                                 defaultChecked 
                                 className="text-blue-600" 
                                 onChange={(e) => {
                                   // TODO + _ +
                                 }}
                               /> No Error in all tracks
                             </label>
                             <label className="flex items-center gap-2 text-sm text-gray-700">
                               <input 
                                 type="radio" 
                                 name="global_send" 
                                 className="text-blue-600" 
                                 onChange={(e) => {
                                   // TODO + _ +
                                 }}
                               /> One more track is normal
                             </label>
                          </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Success indication condition</label>
                          <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm text-gray-700">
                               <input 
                                 type="radio" 
                                 name="success_ind" 
                                 defaultChecked 
                                 className="text-blue-600" 
                                 onChange={(e) => {
                                   // TODO + _ +
                                 }}
                               /> No Error in all tracks
                             </label>
                             <label className="flex items-center gap-2 text-sm text-gray-700">
                               <input 
                                 type="radio" 
                                 name="success_ind" 
                                 className="text-blue-600" 
                                 onChange={(e) => {
                                   // TODO + _ +
                                 }}
                               /> One more track is normal
                             </label>
                          </div>
                      </div>
                   </div>
                 </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default CommonTab;