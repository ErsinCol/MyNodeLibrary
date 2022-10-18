import fs from 'node:fs'
import lighthouse from 'lighthouse'
import chromeLauncher from 'chrome-launcher'
import { parse as domainParse } from 'tldts'

export const mkAuditsFile = async function(url){
    const chrome = await chromeLauncher.launch({chromeFlags:['--headless']})
    const options = {
        logLevel : 'info',
        output: 'json',
        onlyCategories: ['seo'],
        port: chrome.port
    }
    const runnerResult = await lighthouse(url,options)
    const reportAllData = runnerResult.report 

    const parsedDomain = domainParse(url)
    const domainWithoutSuffix = parsedDomain.domainWithoutSuffix

    fs.writeFileSync(`${domainWithoutSuffix}.json`, reportAllData)

    return `${domainWithoutSuffix}.json`

    await chrome.kill()
}


