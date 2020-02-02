#!/bin/bash
set -e
set -u
set -o pipefail

echo
echo "============================================="
echo "= ZENROOM ZERO-KNOWLEDGE PROOF CREDENTIAL"
echo "============================================="

zenroom -z credential_keygen.zen | tee keypair.keys

zenroom -k keypair.keys -z create_request.zen | tee request.json

zenroom -z issuer_keygen.zen | tee issuer_keypair.keys

zenroom -k issuer_keypair.keys -z publish_verifier.zen | tee verifier.json

zenroom -k issuer_keypair.keys -a request.json -z issuer_sign.zen | tee signature.json

zenroom -k keypair.keys -a signature.json -z aggregate_signature.zen | tee credentials.json

zenroom -k credentials.json -a verifier.json -z create_proof.zen | tee proof.json


# zenroom -k proof.json -a verifier.json -z $pfx/verify_proof.zen
# lotion here
cd .. ; node cli.js send verify_proof test/proof.json test/verifier.json ; cd -
