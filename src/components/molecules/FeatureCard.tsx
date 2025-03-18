"use client";


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-bg-secondary rounded-lg relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-10 group-hover:opacity-20 transition-opacity"></div>

      {/* Ícono */}
      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative z-10">
        {icon}
      </div>

      {/* Texto */}
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-muted-foreground relative z-10">{description}</p>

    </div>
  );
};
