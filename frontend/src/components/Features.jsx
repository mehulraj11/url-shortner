import { Link2, Eye, BarChart3 } from "lucide-react";
export default function Features() {
  const items = [
    {
      icon: Link2,
      title: "Fast & Reliable",
      desc: "Instant URL shortening with high availability",
      color: "text-blue-500",
    },
    {
      icon: Eye,
      title: "Click Tracking",
      desc: "Monitor how many times your links are clicked",
      color: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      desc: "Detailed insights on your shortened URLs",
      color: "text-purple-500",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-6 text-center">
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
