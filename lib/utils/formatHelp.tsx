

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatName = (string: string, number: number) => {
  if (string.length > number) {
    return string.substring(0, number).concat('...');
  } else return string;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const formatNumber = (value: number | string) => {
  if (!value) return '';
  const val = Number(value) / 10 ** 2
  return `${val
    .toLocaleString('en-US')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatAsNgnMoney = (value: number | string) => {
  if (!value) return '';
  return `₦${value
    .toLocaleString('en-US')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};


export const isNumber = (value: string | number) => {
  return typeof value === 'number';
};

export const getPageCount = (count: number, limit: number) => {
  const pageCount = Math.ceil(count / limit);
  return pageCount;
};

export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const pageRange = 2;
  const paginationNumbers = [];

  const showBreakIndicatorStart = currentPage > pageRange + 1;
  const showBreakIndicatorEnd = currentPage < totalPages - pageRange;

  for (let i = 1; i <= Math.min(pageRange, totalPages); i++) {
    paginationNumbers.push(i);
  }
  // Show break indicator if needed before the last two pages
  if (showBreakIndicatorStart && !showBreakIndicatorEnd) {
    paginationNumbers.push('...');
  }
  // Show the pages around the active page
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (i > pageRange && i < totalPages - pageRange + 1) {
      paginationNumbers.push(i); // Skip if the page was previously displayed
    }
  }
  // Show break indicator if needed after the first three pages
  if (showBreakIndicatorEnd && !showBreakIndicatorStart) {
    paginationNumbers.push('...');
  }
  // show last two pages
  if (totalPages > 3) {
    for (let i = Math.max(1, totalPages - 1); i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  }
  return paginationNumbers;
};

export const defaultColumnState = (arr: string[]): Record<string, boolean> => {
  return arr.reduce(
    (acc, current) => {
      acc[current] = false;
      return acc;
    },
    {} as Record<string, boolean>
  );
};

export const formatPriceValue = (val: string | number | undefined) => {
  if (!val) {
    return;
  }
  return Math.round(Number(val) * 100);
};

export const formatRegion = {
  lg: 'Lagos',
  ph: 'Port Harcourt',
  ab: 'Abuja',
  abj: 'Abuja',
  ib: 'Ibadan',
  eu: 'Europe',
  na: 'North America',
};

export const formatStatus = {
  published: (
    <p className="flex items-center fw-500 text-green-500 gap-x-2">
      <span className="w-3 h-3 circle bg-green-500"></span> Published
    </p>
  ),
  unpublished: (
    <p className="flex items-center fw-500 text-orange-500 gap-x-2">
      <span className="w-3 h-3 circle bg-orange-500"></span> Unpublished
    </p>
  ),
  active: (
    <p className="flex items-center fw-500 text-green-500 gap-x-2">
      <span className="w-3 h-3 circle bg-green-500"></span> Active
    </p>
  ),
  pending: (
    <p className="flex items-center fw-500 text-orange-500 gap-x-2">
      <span className="w-3 h-3 circle bg-orange-500"></span> Inactive
    </p>
  ),
  inactive: (
    <p className="flex items-center fw-500 text-orange-500 gap-x-2">
      <span className="w-3 h-3 circle bg-orange-500"></span> Inactive
    </p>
  ),
  draft: (
    <p className="flex items-center fw-500 text-purple-500 gap-x-2">
      <span className="w-3 h-3 circle bg-purple-500"></span> Draft
    </p>
  ),
};

export const formatCurrSign = {
  NGN: '₦',
  EURO: '€',
  EUR: '€',
  USD: '$',
};

export const formatFilterName = {
  productCat: 'Category',
  date: 'Date',
  region: 'Region',
  priceRange: 'Price Range',
  productType: 'Product Type',
  status: 'Status',
  stock: 'Availability',
  time: 'Date',
  catGroup: 'Category',
};
interface FieldMapping {
  originalField: string;
  newField: string;
}
export const selectFieldsWithRenaming = (
  objectsArray: Record<string, any>[],
  fieldMappings: FieldMapping[]
): Record<string, string>[] => {
  if (!Array.isArray(objectsArray) || objectsArray.length === 0) {
    console.log('');
  }

  if (!Array.isArray(fieldMappings) || fieldMappings.length === 0) {
    console.log('');
  }

  const newArray: Record<string, string>[] = [];

  for (const obj of objectsArray) {
    const selectedObj: Record<string, string> = {};

    for (const mapping of fieldMappings) {
      const { originalField, newField } = mapping;

      if (obj.hasOwnProperty(originalField)) {
        selectedObj[newField] = obj[originalField];
      }
    }

    newArray.push(selectedObj);
  }

  return newArray;
};

export const getKeysWithTrueValues = (obj: Record<string, any>): string[] => {
  if (!obj || typeof obj !== 'object') {
    console.log('Invalid input object');
  }

  return Object.keys(obj).filter((key) => obj[key] === true);
};

export const removeField = (
  obj: Record<string, any>,
  fieldToRemove: string
): Record<string, any> => {
  if (!obj || typeof obj !== 'object') {
    console.log('Invalid input object');
  }

  const { [fieldToRemove]: removedField, ...rest } = obj;
  return rest;
};

export const formatStringArrayToObject = (array:string[]): Record<string, boolean>  => {
  return array.reduce((result, key) => {
    result[key] = true;
    return result;
  }, {} as Record<string, boolean>);
}

export const isImage = (url:string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
export const isFile = (url:string) => {
  return /\.(pdf|docx|xml|xls)$/.test(url);
}
export const isLink = (url: string) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(url);
}

export const parseData = (value:string) => {
  if (!value) return "";

  return JSON.parse(value)
}

export const formatFile = (url:any) => {
 const file = parseData(url)
 console.log(file);
 
 return file[0]
}
