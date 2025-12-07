import { Shield, Edit, Eye } from 'lucide-react';

interface RoleSelectorProps {
  value: string;
  onChange: (role: string) => void;
}

const roles = [
  { 
    id: 'admin', 
    label: 'مدير', 
    labelEn: 'Admin',
    description: 'صلاحيات كاملة',
    icon: Shield,
    color: 'text-red-500 bg-red-500/10 border-red-500/30'
  },
  { 
    id: 'moderator', 
    label: 'محرر', 
    labelEn: 'Editor',
    description: 'تعديل المحتوى',
    icon: Edit,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
  },
  { 
    id: 'user', 
    label: 'مشاهد', 
    labelEn: 'Viewer',
    description: 'عرض فقط',
    icon: Eye,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/30'
  },
];

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = value === role.id;
        
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              isSelected 
                ? `${role.color} border-current` 
                : 'border-border hover:border-primary/30 bg-muted/30'
            }`}
          >
            <Icon className={`h-6 w-6 mx-auto mb-2 ${isSelected ? '' : 'text-muted-foreground'}`} />
            <div className={`text-sm font-medium ${isSelected ? '' : 'text-foreground'}`}>
              {role.label}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {role.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function getRoleLabel(role: string): string {
  const found = roles.find(r => r.id === role);
  return found?.label || 'مستخدم';
}

export function getRoleColor(role: string): string {
  const found = roles.find(r => r.id === role);
  return found?.color || 'text-muted-foreground bg-muted border-border';
}
