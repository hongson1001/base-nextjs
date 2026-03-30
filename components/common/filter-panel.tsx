"use client";

import { useState } from "react";
import { Button, Card, CardContent } from "@heroui/react";

export interface FilterPanelProps {
  children: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  defaultOpen?: boolean;
}

export function FilterPanel({
  children,
  onApply,
  onReset,
  defaultOpen = false,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <Button
        size="sm"
        variant="tertiary"
        onPress={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </Button>

      {isOpen && (
        <Card className="mt-3">
          <CardContent>
            <div className="flex flex-wrap gap-4">{children}</div>
            <div className="mt-4 flex gap-2">
              {onApply && (
                <Button size="sm" variant="primary" onPress={onApply}>
                  Apply
                </Button>
              )}
              {onReset && (
                <Button size="sm" variant="tertiary" onPress={onReset}>
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
