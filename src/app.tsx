import { useState } from 'preact/hooks'
import { HunterProfile } from './components/HunterProfile'
import aliciaData from './data/hunters/alicia-blanche.json'
import amamiyaData from './data/hunters/amamiya-mirei.json'
import baekYoonhoData from './data/hunters/baek-yoonho.json'
import chaHaeInData from './data/hunters/cha-hae-in.json'
import chaHaeInPspData from './data/hunters/cha-hae-in-pure-sword-princess.json'
import charlotteData from './data/hunters/charlotte.json'
import choiData from './data/hunters/choi-jong-in.json'
import christopherData from './data/hunters/christopher-reed.json'
import elenaData from './data/hunters/elena-renault.json'
import emmaData from './data/hunters/emma-laurent.json'
import esilData from './data/hunters/esil-radiru.json'
import fernData from './data/hunters/fern.json'
import frierenData from './data/hunters/frieren.json'
import ginaData from './data/hunters/gina.json'
import goGunheeData from './data/hunters/go-gunhee.json'
import gotoData from './data/hunters/goto-ryuji.json'
import hanSeMiData from './data/hunters/han-se-mi.json'
import harperData from './data/hunters/harper.json'
import hwangData from './data/hunters/hwang-dongsoo.json'
import islaData from './data/hunters/isla-wright.json'
import lauraData from './data/hunters/laura-walker.json'
import leeBoraData from './data/hunters/lee-bora.json'
import lennartData from './data/hunters/lennart-niermann.json'
import limData from './data/hunters/lim-tae-gyu.json'
import meilinData from './data/hunters/meilin-fisher.json'
import meriData from './data/hunters/meri-laine.json'
import minData from './data/hunters/min-byung-gu.json'
import minnieData from './data/hunters/minnie.json'
import miyeonData from './data/hunters/miyeon.json'
import seoData from './data/hunters/seo-jiwoo.json'
import seorinData from './data/hunters/seorin.json'
import shimizuData from './data/hunters/shimizu-akari.json'
import shuhuaData from './data/hunters/shuhua.json'
import sianData from './data/hunters/sian-halat.json'
import silverManeData from './data/hunters/silver-mane-baek-yoonho.json'
import sonData from './data/hunters/son-kihoon.json'
import soyeonData from './data/hunters/soyeon.json'
import starkData from './data/hunters/stark.json'
import sugimotoData from './data/hunters/sugimoto-reiji.json'
import sungIlhwanData from './data/hunters/sung-il-hwan.json'
import sungJinahData from './data/hunters/sung-jinah.json'
import jinwooData from './data/hunters/sung-jinwoo.json'
import tawataData from './data/hunters/tawata-kanae.json'
import thomasData from './data/hunters/thomas-andre.json'
import wooData from './data/hunters/woo-jinchul.json'
import yooData from './data/hunters/yoo-soohyun.json'
import yuqiData from './data/hunters/yuqi.json'
import { ComparePage } from './pages/ComparePage'
import { HomePage } from './pages/HomePage'
import { TeamGuideDungeons } from './pages/TeamGuideDungeons'
import { TeamGuideGuildBoss } from './pages/TeamGuideGuildBoss'
import { TeamGuidePowerDestruction } from './pages/TeamGuidePowerDestruction'

const hunters = [
	{ id: 'sung-jinwoo', data: jinwooData },
	{ id: 'alicia-blanche', data: aliciaData },
	{ id: 'amamiya-mirei', data: amamiyaData },
	{ id: 'baek-yoonho', data: baekYoonhoData },
	{ id: 'cha-hae-in', data: chaHaeInData },
	{ id: 'cha-hae-in-pure-sword-princess', data: chaHaeInPspData },
	{ id: 'charlotte', data: charlotteData },
	{ id: 'choi-jong-in', data: choiData },
	{ id: 'christopher-reed', data: christopherData },
	{ id: 'elena-renault', data: elenaData },
	{ id: 'emma-laurent', data: emmaData },
	{ id: 'esil-radiru', data: esilData },
	{ id: 'fern', data: fernData },
	{ id: 'frieren', data: frierenData },
	{ id: 'gina', data: ginaData },
	{ id: 'go-gunhee', data: goGunheeData },
	{ id: 'goto-ryuji', data: gotoData },
	{ id: 'han-se-mi', data: hanSeMiData },
	{ id: 'harper', data: harperData },
	{ id: 'hwang-dongsoo', data: hwangData },
	{ id: 'isla-wright', data: islaData },
	{ id: 'laura-walker', data: lauraData },
	{ id: 'lee-bora', data: leeBoraData },
	{ id: 'lennart-niermann', data: lennartData },
	{ id: 'lim-tae-gyu', data: limData },
	{ id: 'meilin-fisher', data: meilinData },
	{ id: 'meri-laine', data: meriData },
	{ id: 'min-byung-gu', data: minData },
	{ id: 'minnie', data: minnieData },
	{ id: 'miyeon', data: miyeonData },
	{ id: 'seo-jiwoo', data: seoData },
	{ id: 'seorin', data: seorinData },
	{ id: 'shimizu-akari', data: shimizuData },
	{ id: 'shuhua', data: shuhuaData },
	{ id: 'sian-halat', data: sianData },
	{ id: 'silver-mane-baek-yoonho', data: silverManeData },
	{ id: 'son-kihoon', data: sonData },
	{ id: 'soyeon', data: soyeonData },
	{ id: 'stark', data: starkData },
	{ id: 'sugimoto-reiji', data: sugimotoData },
	{ id: 'sung-il-hwan', data: sungIlhwanData },
	{ id: 'sung-jinah', data: sungJinahData },
	{ id: 'tawata-kanae', data: tawataData },
	{ id: 'thomas-andre', data: thomasData },
	{ id: 'woo-jinchul', data: wooData },
	{ id: 'yoo-soohyun', data: yooData },
	{ id: 'yuqi', data: yuqiData },
]

export function App() {
	const [page, setPage] = useState<string | null>(null)

	const activeHunter = page ? hunters.find((h) => h.id === page) : null

	const goBack = () => {
		window.scrollTo(0, 0)
		setPage(null)
	}

	if (activeHunter) {
		return <HunterProfile data={activeHunter.data} onBack={goBack} />
	}

	if (page === 'team-dungeons') {
		return <TeamGuideDungeons hunters={hunters} onBack={goBack} />
	}

	if (page === 'team-power-destruction') {
		return <TeamGuidePowerDestruction hunters={hunters} onBack={goBack} />
	}

	if (page === 'team-guild-boss') {
		return <TeamGuideGuildBoss hunters={hunters} onBack={goBack} />
	}

	if (page === 'compare') {
		return <ComparePage hunters={hunters} onBack={goBack} />
	}

	return (
		<HomePage
			hunters={hunters}
			onSelect={(id) => {
				window.scrollTo(0, 0)
				setPage(id)
			}}
			onSelectTeamGuide={(id) => {
				window.scrollTo(0, 0)
				setPage(id)
			}}
		/>
	)
}
