"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectButtonProps {
  squared?: boolean
  placeholder: string
  options: {name: string, value: string}[]
  active?: string
  onChange?: (value: string) => void
}

export function SelectButton({
  squared = false,
  placeholder,
  options,
  active,
  onChange = (value: string) => {}
}: SelectButtonProps) {
  return (
    <Select defaultValue={active} onValueChange={(value)=>onChange(value)}>
      <SelectTrigger className={cn(
        "w-full leading-tight text-base rounded-md transition-colors",
        squared ? "rounded-md" : "rounded-full"
      )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map(({value, name}) => (
            <SelectItem
              key={value}
              className={cn(
                'cursor-pointer size',
                value == active ? 'bg-slate-200 text-slate-900' : '')}
              value={value}>
                {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
