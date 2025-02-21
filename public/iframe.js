const getIframeSSO = async (service_id) => {


    const style = document.createElement("style");
    style.innerHTML = `
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6); 
            z-index: 1000; 
            display: none;
        }

        .iframe-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 600px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            height: 525px;
            display: none;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        .loader {
            border: 4px solid #f3f3f3;
            border-radius: 50%;
            border-top: 4px solid #3498db;
            width: 30px;
            height: 30px;
            -webkit-animation: spin 2s linear infinite; /* Safari */
            animation: spin 2s linear infinite;

            top: 46%;
            position: absolute;
            left: 48%;
            transform: translate(-50%, -50%);
          }
        
          /* Safari */
          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
        
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }


          
    `;


    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "close-button";

    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px'; // Adjust the top value as needed
    closeButton.style.right = '10px'; // Adjust the right value as needed
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '5px 10px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    // Define a function to close the iframe and hide the backdrop
    function closeIframe() {
        iframeContainer.style.display = 'none';
        backdrop.style.display = 'none';
    }

    document.head.appendChild(style);

    const iframe = document.createElement("iframe");
    iframe.src = 'https://sso.hp.gov.in/login-iframe?service_id=' + service_id;

    closeButton.addEventListener("click", closeIframe);

    const backdrop = document.querySelector('.backdrop');
    backdrop.style.display = 'block';


    const iframeContainer = document.querySelector('.iframe-container');
    iframeContainer.style.display = 'block';

    const existingCloseButton = iframeContainer.querySelector('.close-button');


    if (!existingCloseButton) {
        iframeContainer.appendChild(closeButton);
    }



    const existingIframe = iframeContainer.querySelector('iframe');

    if (!existingIframe) {
        iframeContainer.appendChild(iframe);

        const loader = document.createElement("div");
        loader.className = "loader";

        // Append the loader to the iframeContainer
        iframeContainer.appendChild(loader);

        iframe.onload = function () {
            loader.style.display = 'none';
        };
    }



}