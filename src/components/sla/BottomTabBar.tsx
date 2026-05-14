import { useLocation } from 'preact-iso'
import { NAV_ITEMS } from './nav-items'

export function BottomTabBar() {
  const { url } = useLocation()

  return (
    <nav class="sla-bottom-tab">
      {NAV_ITEMS.map((item) => {
        const active = url === item.href || (item.href !== '/' && url.startsWith(item.href))
        return (
          <a
            key={item.href}
            href={item.href}
            class={`sla-bottom-tab-item${active ? ' active' : ''}`}
          >
            <span class="sla-bottom-tab-icon">{item.icon}</span>
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
