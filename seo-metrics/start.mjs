import  {mkAuditsFile} from './src/index.mjs'
import fs from 'node:fs'

const file = await mkAuditsFile('https://kodsozluk.com')
const allData = fs.readFileSync(`${file}`);
const result= JSON.parse(allData);
const audits =result.categories.seo.auditRefs;
const score = result.categories.seo.score
console.log(audits)
console.log('score: ',score)
