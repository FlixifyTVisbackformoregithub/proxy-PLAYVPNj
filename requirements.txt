from flask import Flask, request, Response
import requests

app = Flask(__name__)

@app.route('/proxy/<path:url>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(url):
    # Allowing only certain methods to be proxied
    if request.method not in ['GET', 'POST', 'PUT', 'DELETE']:
        return Response("Method not allowed!", status=405)

    # Build the full URL
    full_url = f"http://{url}"

    # Get the request data
    headers = {key: value for (key, value) in request.headers if key != 'Host'}
    req = requests.request(method=request.method, url=full_url, headers=headers, data=request.get_data(), cookies=request.cookies)
    
    return Response(req.content, status=req.status_code, headers=dict(req.headers))

if __name__ == '__main__':
    app.run(port=5000)
