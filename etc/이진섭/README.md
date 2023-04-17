# Docker의 이해
## 컨테이너 정의
- 격리된 공간에서 프로세스가 동작하는 기술
## 도커의 정의
- 컨테이너 기반의 오픈소스 가상화 플랫폼
## Hypervisor 기반 가상화
- 기존의 가상화 방식은 주로 OS를 가상화하였다.
- VMware나 VirtualBox 같은 가상머신은 호스트 OS 위에 게스트 OS 전체를 가상화하여 사용하는 방식이다.
- 이와 같이 추가적인 OS를 설치하여 가상화하는 방법은 overhead가 발생하였고, 이를 개선하기 위해 프로세스 격리하는 방식이 등장했다.
## Container 기반 가상화
- 단순 프로세스를 격리시키기 때문에 가볍고 빠르게 동작한다.
- CPU, Memory는 프로세스가 필요한만큼만 사용하므로 성능상의 이슈는 거의 없다.
- 컨테이너를 사용하다 보면 가벼운 VM의 느낌을 준다.
## Docker는 Client와 Server (Docker Host) 구조
- Client : user가 'docker run' 등의 명령어를 입력하면 이를 Server쪽에 전송하고, 이를 Docker daemon이 수행한다.
- Docker daemon : docker api 요청을 수신하고 image, container, network, volume과 같은 docker object를 관리한다. 다른 docker daemon과의 통신을 통해 서비스를 관리할 수 있다.
- Docker Registry : Docker 이미지 저장소이다.
- Image : 컨테이너 실행에 필요한 파일과 설정값 등을 포함하고 있다. (Immutable) 공식 이미지의 경우 해당 이미지를 실행하기 위한 모든 것이 세팅되어 있다.
## 도커의 특징
- 레이어 저장방식
    - 도커 이미지는 컨테이너를 실행하기 위한 모든 정보를 가지고 있기 때문에 용량이 크다. 처음 이미지를 다운받을 때는 크게 부담이 되지 않지만, 기존 이미지에 파일 하나 추가했다고 다시 해당 용량이 큰 파일을 다시 받는건 비효율적이다.
    - 도커는 이런 문제를 해결하기 위해서 Layer라는 개념을 사용하고 유니온 파일 시스템을 이용하여 여러개의 레이어를 하나의 파일시스템으로 사용할 수 있게 해준다
    - 컨테이너 생성할 때도 레이어 방식을 사용하여 기존의 이미지 레이어 위에 읽기/쓰기(read-write) 레이어를 추가한다.
- Dockerfile
    - 도커는 이미지를 만들기 위해 Dockerfile이라는 파일에 자체 DSL(Domain-specific language) 언어를 이용하여 이미지 생성 과정을 적는다.
    - Application 실행에 필요한 과정들을 Dockerfile로 작성하여 관리할 수 있으며, 해당 Dockerfile을 보면서 이미지 생성과정을 알 수 있으므로 수정하기도 용이하다.
- Docker Hub
    - Docker hub를 통해 공개 이미지를 무료로 관리해줍니다. 공식 이미지를 직접 관리해주며, namespace가 없다.