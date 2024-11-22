import { test, expect } from '@playwright/test';
import { Upload } from '../src/locator/upload';

test.describe('Upload', () => {

    test('upload', async ({ page }) => {
        const upload = new Upload(page);
        await upload.fileUpload();
        await expect(upload.successMessage).toContainText('File Uploaded!');
    });

})