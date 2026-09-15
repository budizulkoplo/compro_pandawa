import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link, usePage } from "@inertiajs/react";
import { Plus, Minus } from "lucide-react";
import { type NavItem } from "@/types";
import { useEffect, useState } from "react";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const shouldOpen = items.some(
      (item) =>
        item.items &&
        item.items.some((sub) => {
          const subHref =
            typeof sub.href === "string" ? sub.href : sub.href?.url || "#";
          return page.url.includes(subHref);
        })
    );
    setOpen(shouldOpen);
  }, [page.url, items]);

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item, index) => {
          const href =
            typeof item.href === "string" ? item.href : item.href?.url || "#";
          const isActive = page.url.startsWith(href);

          // Jika item memiliki sub-items
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                key={item.title + index}
                defaultOpen={open}
                onOpenChange={setOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isActive}>
                      {item.icon && <item.icon className="mr-2" />}
                      <span>{item.title}</span>
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((sub) => {
                        const subHref =
                          typeof sub.href === "string"
                            ? sub.href
                            : sub.href?.url || "#";
                        const subActive = page.url.startsWith(subHref);

                        return (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subActive}
                            >
                              <Link href={subHref} prefetch>
                                {sub.icon && <sub.icon className="mr-2" />}
                                <span>{sub.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // Jika item tidak punya sub-items
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={href} prefetch>
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
