apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: ethSigner-bes
  namespace: {{ component_ns }}
  annotations:
    fluxcd.io/automated: "false"
spec:
  chart:
    path: {{ component_gitops.chart_source }}/ethSigner
    git: "{{ component_gitops.git_url }}"
    ref: "{{ component_gitops.branch }}"
  releaseName: {{ name }}{{ network.type }}-ethSigner
  values:
    nodeName: ethSigner-bes
    metadata:
      namespace: {{ component_ns }}
    replicaCount: 1
    vault:
      address: {{ organization_data.vault.url }}
      secretprefix: {{ organization_data.vault.secret_path | default('secret') }}/data/{{ component_ns }}/crypto/m-peer1/data
      keyname: password
      serviceaccountname: vault-auth
      contractName: General
      role: vault-role
      authpath: besu{{ organization_data.name | lower }}
    images:
      ethSigner: consensys/ethsigner:21.3
      alpineutils: index.docker.io/hyperledgerlabs/alpine-utils:1.0

    expressapp:
      serviceType: ClusterIP
      nodePorts:
        port: {{ peer_express_api_port }}
        targetPort: {{ peer_express_api_targetport }}
        name: tcp
      env:
        geth_address: {{ geth_address }}
        node_subject: {{ peer_data.subject }}
        protocol: {{ network.config.consensus }}
    
