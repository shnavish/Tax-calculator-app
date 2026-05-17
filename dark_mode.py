import os
import re

replacements = {
    r'bg-\[\#FAFAFA\]': 'bg-slate-950',
    r'bg-slate-50': 'bg-slate-950',
    r'bg-white': 'bg-slate-900',
    r'text-gray-900': 'text-white',
    r'text-slate-900': 'text-white',
    r'text-gray-800': 'text-slate-200',
    r'text-slate-800': 'text-slate-200',
    r'text-gray-700': 'text-slate-300',
    r'text-slate-700': 'text-slate-300',
    r'text-gray-600': 'text-slate-400',
    r'text-slate-600': 'text-slate-400',
    r'text-gray-500': 'text-slate-400',
    r'text-slate-500': 'text-slate-400',
    r'text-gray-400': 'text-slate-500',
    r'text-slate-400': 'text-slate-500',
    r'border-gray-100': 'border-slate-800',
    r'border-slate-100': 'border-slate-800',
    r'border-gray-200': 'border-slate-700',
    r'border-slate-200': 'border-slate-700',
    r'border-gray-300': 'border-slate-600',
    r'border-slate-300': 'border-slate-600',
    r'bg-gray-100': 'bg-slate-800',
    r'bg-gray-50': 'bg-slate-800',
    r'bg-slate-100': 'bg-slate-800',
    r'bg-slate-50': 'bg-slate-950',
    r'ring-gray-200': 'ring-slate-700',
    r'ring-slate-200': 'ring-slate-700',
    r'hover:bg-gray-50': 'hover:bg-slate-800',
    r'hover:bg-gray-100': 'hover:bg-slate-800',
    r'shadow-sm': 'shadow-md shadow-black/20',
    r'bg-indigo-50': 'bg-indigo-900/30',
    r'bg-green-50': 'bg-green-900/30',
    r'bg-blue-50': 'bg-blue-900/30',
    r'bg-amber-50': 'bg-amber-900/30',
    r'bg-rose-50': 'bg-rose-900/30',
    r'bg-emerald-50': 'bg-emerald-900/30',
    r'bg-violet-50': 'bg-violet-900/30',
    r'border-indigo-100': 'border-indigo-800',
    r'border-green-100': 'border-green-800',
    r'border-blue-100': 'border-blue-800',
    r'border-amber-100': 'border-amber-800',
    r'border-rose-100': 'border-rose-800',
    r'border-emerald-100': 'border-emerald-800',
    r'border-violet-100': 'border-violet-800',
    r'text-indigo-700': 'text-indigo-400',
    r'text-indigo-600': 'text-indigo-400',
    r'text-green-800': 'text-green-400',
    r'text-green-600': 'text-green-400',
    r'bg-white/95': 'bg-slate-900/95',
    r'bg-white/80': 'bg-slate-900/80',
    r'bg-white/10': 'bg-slate-800/50',
    r'shadow-gray-200': 'shadow-black/50',
    r'shadow-slate-300': 'shadow-black/50',
    r'hover:bg-gray-200': 'hover:bg-slate-700',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, replacement in replacements.items():
        # Match whole words to avoid partial replacement, except for some specific cases
        # For tailwind classes, typically they are bounded by space, quote, or `
        new_content = re.sub(r'(?<=[\s"\'`])' + pattern + r'(?=[\s"\'`])', replacement, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('d:/Tax calculator app/src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css'):
            process_file(os.path.join(root, file))
