apiVersion: helm.fluxcd.io/v1
kind: HelmRelease
metadata:
  name: {{ name }}-express-api
  namespace: {{ component_ns }}
  annotations:
    fluxcd.io/automated: "false"
spec:
  chart:
    path: {{ component_gitops.chart_source }}/express_api_besu
    git: "{{ component_gitops.git_url }}"
    ref: "{{ component_gitops.branch }}"
  releaseName: {{ name }}{{ network.type }}-express-api
  values:
    nodeName: {{ name }}-express-api
    metadata:
      namespace: {{ component_ns }}
    replicaCount: 1
    vault:
      address: {{ organization_data.vault.url }}
      secretprefix: {{ organization_data.vault.secret_path | default('secret') }}/data/{{ component_ns }}/smartContracts
      serviceaccountname: vault-auth
      contractName: General
      role: vault-role
      authpath: besu{{ organization_data.name | lower }}
    images:
      alpineutils: {{ network.docker.url }}/alpine-utils:1.0
    expressapp:
      serviceType: ClusterIP
      image: {{ network.docker.url }}/{{ express_api_image }}
      pullPolicy: Always
      pullSecrets: regcred
      nodePorts:
        port: {{ peer_express_api_port }}
        targetPort: {{ peer_express_api_targetport }}
        name: tcp
      env:
        geth_address: {{ geth_address }}
        node_subject: {{ peer_data.subject }}
        protocol: {{ network.config.consensus }}
    proxy:
      provider: {{ network.env.proxy }}
      name: {{ organization_data.name }}
      external_url_suffix: {{ organization_data.external_url_suffix }}
      peer_name: {{ name }}
