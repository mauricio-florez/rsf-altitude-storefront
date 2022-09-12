import React, { memo } from 'react'
import Link from '../Link'
import styles from './NavigationBar.module.scss'

/**
 *
 * @property {Object} tabs
 * @returns React Element
 */
function NavBar({ tabs }) {
  return (
    <fragment>
      <input className={styles['side-menu']} type="checkbox" id="side-menu"/>
      <label className={styles.hamburger} htmlFor="side-menu"><span className={styles['hamburger-line']}></span></label>
      <nav className={styles.nav}>
          <ul className={styles.menu}>
              {tabs.map(c => (
                <li key={c.id} sx={{ mr: 2 }}>
                  <Link href={`/s/${c.slug}`}>
                    <a style={{ fontWeight: '900' }}>{c.name}</a>
                  </Link>
                  <div className={styles['dropdown-content']}>
                    {c.children &&
                      c.children.map(cc => (
                        <Link key={cc.id} href={`/s/${cc.slug}`}>
                          <a> {cc.name}</a>
                        </Link>
                      ))
                    }
                  </div>
                </li>
              ))}
          </ul>
      </nav>
    </fragment>
  )
}

export default NavBar
