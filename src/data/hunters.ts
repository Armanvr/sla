import type { HunterData } from '../components/hunter/types'
import aliciaData from './hunters/alicia-blanche.json'
import amamiyaData from './hunters/amamiya-mirei.json'
import antoineData from './hunters/antoine-martinez.json'
import baekYoonhoData from './hunters/baek-yoonho.json'
import chaHaeInData from './hunters/cha-hae-in.json'
import chaHaeInPspData from './hunters/cha-hae-in-pure-sword-princess.json'
import charlotteData from './hunters/charlotte.json'
import choiData from './hunters/choi-jong-in.json'
import christopherData from './hunters/christopher-reed.json'
import elenaData from './hunters/elena-renault.json'
import emmaData from './hunters/emma-laurent.json'
import esilData from './hunters/esil-radiru.json'
import fernData from './hunters/fern.json'
import frierenData from './hunters/frieren.json'
import ginaData from './hunters/gina.json'
import goGunheeData from './hunters/go-gunhee.json'
import gotoData from './hunters/goto-ryuji.json'
import hanSeMiData from './hunters/han-se-mi.json'
import harperData from './hunters/harper.json'
import hwangData from './hunters/hwang-dongsoo.json'
import islaData from './hunters/isla-wright.json'
import lauraData from './hunters/laura-walker.json'
import leeBoraData from './hunters/lee-bora.json'
import lennartData from './hunters/lennart-niermann.json'
import limData from './hunters/lim-tae-gyu.json'
import meilinData from './hunters/meilin-fisher.json'
import meriData from './hunters/meri-laine.json'
import minData from './hunters/min-byung-gu.json'
import minnieData from './hunters/minnie.json'
import miyeonData from './hunters/miyeon.json'
import seoData from './hunters/seo-jiwoo.json'
import seorinData from './hunters/seorin.json'
import shimizuData from './hunters/shimizu-akari.json'
import shuhuaData from './hunters/shuhua.json'
import sianData from './hunters/sian-halat.json'
import silverManeData from './hunters/silver-mane-baek-yoonho.json'
import sonData from './hunters/son-kihoon.json'
import soyeonData from './hunters/soyeon.json'
import starkData from './hunters/stark.json'
import sugimotoData from './hunters/sugimoto-reiji.json'
import sungIlhwanData from './hunters/sung-il-hwan.json'
import sungJinahData from './hunters/sung-jinah.json'
import jinwooData from './hunters/sung-jinwoo.json'
import tawataData from './hunters/tawata-kanae.json'
import thomasData from './hunters/thomas-andre.json'
import wooData from './hunters/woo-jinchul.json'
import yooData from './hunters/yoo-soohyun.json'
import yuqiData from './hunters/yuqi.json'

export interface HunterEntry {
	id: string
	data: HunterData
}

export const hunters: HunterEntry[] = [
	{ id: 'sung-jinwoo', data: jinwooData },
	{ id: 'alicia-blanche', data: aliciaData },
	{ id: 'amamiya-mirei', data: amamiyaData },
	{ id: 'baek-yoonho', data: baekYoonhoData },
	{ id: 'cha-hae-in', data: chaHaeInData },
	{ id: 'cha-hae-in-pure-sword-princess', data: chaHaeInPspData },
	{ id: 'charlotte', data: charlotteData },
	{ id: 'choi-jong-in', data: choiData },
	{ id: 'christopher-reed', data: christopherData },
	{ id: 'antoine-martinez', data: antoineData },
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
] as unknown as HunterEntry[]

export function findHunter(id: string | undefined): HunterEntry | undefined {
	if (!id) return undefined
	return hunters.find((h) => h.id === id)
}
