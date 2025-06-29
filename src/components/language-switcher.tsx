"use client"

import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Language } from "@/lib/translations"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="jp">日本語</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="id">Bahasa Indonesia</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
