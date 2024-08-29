export function convertCategoryToRoutePath(category: string ){
    return category.toLowerCase()
                    .replace(/'/g, '')
                    .replace(/\s+/g, '-');
  };
  