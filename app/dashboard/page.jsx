'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [devices, setDevices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [control, setControl] = useState({ manual: false, value_led: false, value_buzzer: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch devices on load
  useEffect(() => {
    fetch('/api/dashboard/devices')
      .then(r => {
        if (!r.ok) throw new Error(`Server responded with ${r.status}`);
        return r.json();
      })
      .then(d => setDevices(d.devices || []))
      .catch(err => {
        console.error("Failed to fetch devices:", err);
        setError("Failed to load devices. Please refresh the page.");
      });
  }, []);

  // Fetch logs & build chart whenever device changes or every minute
  useEffect(() => {
    if (selected == null) return;
    
    setLoading(true);
    setError(null);

    // Fetch initial control state when device changes
    fetch(`/api/control/${selected}`)
      .then(r => {
        if (!r.ok) throw new Error(`Server responded with ${r.status}`);
        return r.json();
      })
      .then(data => {
        setControl(data || { manual: false, value_led: false, value_buzzer: false });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch control state:", err);
        setLoading(false);
        setError("Failed to load control settings.");
      });

    const fetchLogs = () => {
      fetch(`/api/dashboard/logs/${selected}`)
        .then(r => {
          if (!r.ok) throw new Error(`Server responded with ${r.status}`);
          return r.json();
        })
        .then(d => {
          setLogs(d.logs || []);
          const formatted = (d.logs || []).map(log => ({
            timestamp: new Date(log.timestamp).toLocaleTimeString("en-IN"),
            temperature: log.temperature,
            humidity: log.humidity,
            soil: log.soil_moisture
          }));
          setChartData(formatted);
        })
        .catch(err => {
          console.error("Failed to fetch logs:", err);
          setError("Failed to load sensor data.");
        });
    };

    fetchLogs(); // initial fetch

    const interval = setInterval(fetchLogs, 6000); // fetch every 60 seconds

    return () => clearInterval(interval);
  }, [selected]);

  // Update server control
  const updateControl = (key, value) => {
    const upd = { ...control, [key]: value };
    setControl(upd);
    
    fetch(`/api/dashboard/control/${selected}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(upd)
    })
    .then(r => {
      if (!r.ok) throw new Error(`Server responded with ${r.status}`);
      return r.text().then(text => text ? JSON.parse(text) : {});
    })
    .catch(err => {
      console.error("Failed to update control:", err);
      setError("Failed to update device settings.");
      // Revert back to previous state on error
      setControl(control);
    });
  };

  if (error) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-[#0f0f16]">
        <div className="bg-[#1a1a27] border-l-4 border-red-500 p-4 w-full max-w-lg rounded-xl backdrop-blur-lg bg-opacity-80 shadow-2xl">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        </div>
        <Button 
          className="mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-lg shadow-fuchsia-500/20 transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-[#0f0f16] bg-gradient-to-br from-[#0f0f16] to-[#1a1a27] min-h-screen text-gray-100">
      <div className="relative z-10">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
          Greenhouse Buddy Dashboard 🪴✨
        </h1>
        <p className="text-gray-400 text-sm">Monitoring and control system for your GreenHouses</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {devices.map(id => (
          <Button 
            key={id} 
            variant={selected === id ? 'default' : 'outline'} 
            onClick={() => setSelected(id)}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              selected === id ? 
              'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20 scale-105' : 
              'bg-[#1a1a27] border-[#2a2a3d] text-gray-300 hover:bg-[#252533] hover:border-violet-500 hover:text-gray-100'
            }`}
          >
            GreenHouse {id}
          </Button>
        ))}
      </div>

      {selected != null && (
        <>
          <Card className="overflow-hidden border-0 shadow-xl rounded-2xl bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  GreenHouse Control
                </span> 
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-2 py-0.5 text-sm rounded-full shadow-sm shadow-fuchsia-500/30">
                  #{selected}
                </span>
              </h2>
              
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-8 w-24 bg-[#252533] rounded"></div>
                    <div className="h-8 w-24 bg-[#252533] rounded"></div>
                    <div className="h-8 w-24 bg-[#252533] rounded"></div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-gray-300">Manual Mode</Label>
                    <Switch 
                      checked={control.manual} 
                      onCheckedChange={v => updateControl('manual', v)} 
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-violet-600 data-[state=checked]:to-fuchsia-600 data-[state=checked]:shadow-lg data-[state=checked]:shadow-fuchsia-500/20 bg-[#252533]" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-gray-300">Motor</Label>
                    <Switch 
                      checked={control.value_led} 
                      onCheckedChange={v => updateControl('value_led', v)} 
                      disabled={!control.manual} 
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-600 data-[state=checked]:to-blue-600 data-[state=checked]:shadow-lg data-[state=checked]:shadow-blue-500/20 bg-[#252533]" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="font-medium text-gray-300">Buzzer</Label>
                    <Switch 
                      checked={control.value_buzzer} 
                      onCheckedChange={v => updateControl('value_buzzer', v)} 
                      disabled={!control.manual} 
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-600 data-[state=checked]:to-orange-600 data-[state=checked]:shadow-lg data-[state=checked]:shadow-orange-500/20 bg-[#252533]" 
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Charts in flexbox */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Temperature Chart */}
            <Card className="flex-1 border-0 shadow-xl rounded-2xl overflow-hidden bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                  <span className="text-rose-400 mr-2">🔥</span> Temperature
                </h2>
                <div style={{ width: "100%", minWidth: 0, height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#252533" />
                      <XAxis dataKey="timestamp" tick={{fill: '#94a3b8'}} />
                      <YAxis tick={{fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1a1a27', 
                          borderRadius: '10px', 
                          border: 'none', 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                          color: '#e4e4e7'
                        }} 
                        itemStyle={{color: '#e4e4e7'}}
                        labelStyle={{color: '#94a3b8'}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#f87171" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{r: 6, fill: '#f87171', stroke: '#fecaca', strokeWidth: 2}} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Humidity Chart */}
            <Card className="flex-1 border-0 shadow-xl rounded-2xl overflow-hidden bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                  <span className="text-blue-400 mr-2">💦</span> Humidity
                </h2>
                <div style={{ width: "100%", minWidth: 0, height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#252533" />
                      <XAxis dataKey="timestamp" tick={{fill: '#94a3b8'}} />
                      <YAxis tick={{fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1a1a27', 
                          borderRadius: '10px', 
                          border: 'none', 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                          color: '#e4e4e7'
                        }} 
                        itemStyle={{color: '#e4e4e7'}}
                        labelStyle={{color: '#94a3b8'}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humidity" 
                        stroke="#60a5fa" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{r: 6, fill: '#60a5fa', stroke: '#bfdbfe', strokeWidth: 2}} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Soil Moisture Chart */}
            <Card className="flex-1 border-0 shadow-xl rounded-2xl overflow-hidden bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                  <span className="text-emerald-400 mr-2">🌱</span> Soil Moisture
                </h2>
                <div style={{ width: "100%", minWidth: 0, height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#252533" />
                      <XAxis dataKey="timestamp" tick={{fill: '#94a3b8'}} />
                      <YAxis tick={{fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1a1a27', 
                          borderRadius: '10px', 
                          border: 'none', 
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                          color: '#e4e4e7'
                        }} 
                        itemStyle={{color: '#e4e4e7'}}
                        labelStyle={{color: '#94a3b8'}}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="soil" 
                        stroke="#34d399" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{r: 6, fill: '#34d399', stroke: '#a7f3d0', strokeWidth: 2}} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-[#1a1a27] backdrop-blur-lg bg-opacity-90 border-t border-gray-800">
            <CardContent className="p-6 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 flex items-center text-white">
                <span className="text-violet-400 mr-2">📊</span> Recent Data
              </h2>
              <div className="rounded-xl overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#252533] border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-center font-semibold text-gray-300">Time</th>
                      <th className="px-6 py-3 text-center font-semibold text-rose-400">Temp (°C)</th>
                      <th className="px-6 py-3 text-center font-semibold text-blue-400">Humidity (%)</th>
                      <th className="px-6 py-3 text-center font-semibold text-emerald-400">Soil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {logs.slice(-100).reverse().map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#252533] transition-colors">
                        <td className="px-6 py-3 text-center font-medium text-gray-300">{new Date(log.timestamp).toLocaleString("en-IN")}</td>
                        <td className="px-6 py-3 text-center text-rose-400">{log.temperature}</td>
                        <td className="px-6 py-3 text-center text-blue-400">{log.humidity}</td>
                        <td className="px-6 py-3 text-center text-emerald-400">{log.soil_moisture}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
