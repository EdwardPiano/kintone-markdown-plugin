// kintoneFieldUtils.ts

type KintoneField = {
  code: string;
  label: string;
  type: string;
};

type MultiLineTextField = {
  code: string;
  label: string;
};

export async function getMultiLineTextFields(appId: number): Promise<MultiLineTextField[]> {
  return new Promise((resolve, reject) => {
    kintone.api(kintone.api.url('/k/v1/app/form/fields', true),'GET',{ app: appId },
      (resp: { properties: Record<string, KintoneField> }) => {
        const fields = Object.values(resp.properties);
        const multiLineFields = fields
          .filter((field) => field.type === 'MULTI_LINE_TEXT')
          .map((field) => ({
            code: field.code,
            label: field.label,
          }));
        resolve(multiLineFields);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
