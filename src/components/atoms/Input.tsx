type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => (
  <input
    {...props}
    className="
      w-full px-4 py-3 rounded-xl border-2 border-slate-100 
      bg-white text-foreground outline-none transition-all duration-300
      placeholder:text-muted/50
      
      /* ✨ Efecto de Enfoque Refinado */
      focus:border-primary/50 
      focus:shadow-[0_0_0_4px_rgba(246,85,166,0.1)] 
      hover:border-accent/30
    "
  />
);