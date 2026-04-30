import { useEffect } from 'preact/hooks'
import { LocationProvider, Route, Router, useLocation } from 'preact-iso'
import { HunterProfile } from './components/HunterProfile'
import { BackLink } from './components/sla/BackLink'
import { Nav } from './components/sla/Nav'
import { Panel } from './components/sla/Panel'
import { findHunter, hunters } from './data/hunters'
import { ComparePage } from './pages/ComparePage'
import { DesignSystemPage } from './pages/DesignSystemPage'
import { HomePage } from './pages/HomePage'
import { TeamGuideDungeons } from './pages/TeamGuideDungeons'
import { TeamGuideGuildBoss } from './pages/TeamGuideGuildBoss'
import { TeamGuidePowerDestruction } from './pages/TeamGuidePowerDestruction'
import { TeamGuideWorkshop } from './pages/TeamGuideWorkshop'

function ScrollToTop() {
	const { url } = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [url])
	return null
}

function HomeRoute() {
	return <HomePage hunters={hunters} />
}

function HunterRoute({ id }: { id?: string }) {
	const entry = findHunter(id)
	if (!entry) return <NotFound />
	return <HunterProfile data={entry.data} />
}

function DungeonsRoute() {
	return <TeamGuideDungeons hunters={hunters} />
}
function PowerRoute() {
	return <TeamGuidePowerDestruction hunters={hunters} />
}
function GuildBossRoute() {
	return <TeamGuideGuildBoss hunters={hunters} />
}
function WorkshopRoute({ raid }: { raid?: string }) {
	if (!raid) return <NotFound />
	return <TeamGuideWorkshop hunters={hunters} raidName={raid} />
}
function CompareRoute() {
	return <ComparePage hunters={hunters} />
}

function NotFound() {
	return (
		<div class='sla-container' style={{ paddingTop: 64, paddingBottom: 64 }}>
			<BackLink />
			<Panel corners class='sla-anim-in' style={{ marginTop: 32, padding: 48, textAlign: 'center' }}>
				<div class='sla-tag' style={{ display: 'inline-block', marginBottom: 16 }}>
					{'ERROR // 404'}
				</div>
				<h1 class='sla-title-section sla-text-glow' style={{ marginTop: 0 }}>
					Signal lost
				</h1>
				<p style={{ color: 'var(--sla-text-secondary)', marginTop: 16 }}>
					Cette route n'existe pas dans le réseau SLA.
				</p>
				<a href='/' class='sla-btn sla-btn-primary' style={{ marginTop: 24 }}>
					◄ Retour au QG
				</a>
			</Panel>
		</div>
	)
}

export function AppRouter() {
	return (
		<LocationProvider>
			<ScrollToTop />
			<Nav />
			<main>
				<Router>
					<Route path='/' component={HomeRoute} />
					<Route path='/hunter/:id' component={HunterRoute} />
					<Route path='/team/dungeons' component={DungeonsRoute} />
					<Route path='/team/power-destruction' component={PowerRoute} />
					<Route path='/team/guild-boss' component={GuildBossRoute} />
					<Route path='/team/workshop/:raid' component={WorkshopRoute} />
					<Route path='/compare' component={CompareRoute} />
					<Route path='/design-system' component={DesignSystemPage} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	)
}
