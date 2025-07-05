import LayoutMain from './components/Main/Main.tsx'
import LayoutMenu from './components/Menu/Menu.tsx'
import LayoutHeader from './components/Header/Header.tsx'
import Breadcrumb from './components/Breadcrumb/Breadcrumb.tsx'
import ThemeSetting from './components/ThemeSetting/ThemeSetting.tsx'
import './index.less'

const LayoutIndex: React.FC = () => {
  return (
    <>
      <section className="layout-index">
        <LayoutHeader />

        <div className="layout-content">
          <LayoutMenu />

          <main className="layout-main">
            <div className="breadcrumb-nav">
              <Breadcrumb />
            </div>

            <div className="main-content">
              <LayoutMain />
            </div>
          </main>
        </div>
      </section>
      <ThemeSetting />
    </>
  )
}

export default LayoutIndex
