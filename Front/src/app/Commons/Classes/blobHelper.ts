import { Injector, NgZone } from "@angular/core";

export class BlobHelper {
  static downloadBlob(
    blobInput: any,
    fileName: string,
    mimeType: string,
    extension: string
  ) {
    // We need to type explicitly to use the merged ambient declaration of HTMLAnchorElement
    const downloadAnchor: HTMLAnchorElement = document.createElement("a");
    let url: any = null;

    // IE 11 & Edge fix
    if (<any>window.navigator && (<any>window.navigator).msSaveOrOpenBlob) {
      (<any>window.navigator).msSaveOrOpenBlob(
        blobInput,
        `${fileName}.${extension}`
      );
    } else {
        
      url = window.URL.createObjectURL(blobInput);
      downloadAnchor.href = url;
      downloadAnchor.download = `${fileName}.${extension}`;

      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      setTimeout(function() {
        document.body.removeChild(downloadAnchor);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  }

  static base64ToArray(base64: string) {
    let result: any[];

    let binary = window.atob(base64);
    result = new Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      result[i] = binary.charCodeAt(i);
    }

    return result;
  }

  static buildBlob(stream: any, filename: string): Blob {
    // let sanitizedMimeType: string = BlobHelper.getMimeTypeByFileExtension(
    //   filename
    // );
    // let blob = new Blob([stream], { type: sanitizedMimeType });

    var binary = atob(stream)
    var array = new Uint8Array(binary.length)
    for( var i = 0; i < binary.length; i++ ) { array[i] = binary.charCodeAt(i) }
    

    return new Blob([array]);
  }

  static getMimeTypeByFileExtension(filename: string): string {
    let sanitizedMimeType: string;
    let filenameSegments = filename.split(".");
    //We will assume that if we cannot split the filename it means that we are dealing with the extension directly.
    let extension =
      filenameSegments.length > 1
        ? filenameSegments[filenameSegments.length - 1]
        : filename;

    switch (extension) {
      case "pdf":
        sanitizedMimeType = "application/pdf";
        break;
      case "jpg":
        sanitizedMimeType = "image/jpg";
        break;
      case "jpeg":
        sanitizedMimeType = "image/jpeg";
        break;
      case "png":
        sanitizedMimeType = "image/png";
        break;
      case "csv":
        sanitizedMimeType = "text/csv";
        break;
      case "txt":
        sanitizedMimeType = "text/plain";
        break;
      case "rtf":
        sanitizedMimeType = "text/richtext";
        break;
      case "xls":
        sanitizedMimeType = "application/vnd.ms-excel";
        break;
      case "xlsx":
        sanitizedMimeType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;
      default:
        sanitizedMimeType = "text/plain";
    }

    return sanitizedMimeType;
  }

  static downloadBase64File(base64Data: string): void {
    window.open(base64Data);
  }
}

export interface HTMLAnchorElement extends HTMLElement {
  download?: string;
  href?: string;
}
