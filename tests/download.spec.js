import { test, expect } from '@playwright/test';
import fs from 'fs/promises'
import { DownloadPage } from '../src/locator/download';

test.describe('Download', () => {

    test('download', async ({page})=> {
       const downloadPage = new DownloadPage(page);
       await downloadPage.downloadFile();
       await expect(fs.stat(downloadPage.downloadPath + downloadPage.suggestedFilename)).resolves.toBeDefined();
    });

})