import { Link2, Eye } from "lucide-react";
export default function Features() {
  const items = [
    {
      icon: Link2,
      title: "Fast & Reliable",
      desc: "Instant URL shortening",
      color: "text-blue-500",
    },
    {
      icon: Eye,
      title: "Click Tracking",
      desc: "See how many times links got clicked",
      color: "text-green-500",
    },
    
  ];
  return (
    <div className="grid md:grid-cols-2 gap-6 text-center">
      {items.map((f, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
          <f.icon className={`w-8 h-8 ${f.color} mx-auto mb-3`} />
          <h3 className="font-semibold mb-2">{f.title}</h3>
          <p className="text-gray-600 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
