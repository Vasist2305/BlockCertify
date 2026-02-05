// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BlockCertify is AccessControl {

    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Certificate {
        string certificateId;
        string ipfsHash;
        address studentWallet;
        bool revoked;
        uint256 issuedAt;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(
        string certificateId,
        string ipfsHash,
        address studentWallet
    );

    event CertificateRevoked(string certificateId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // ✅ Add institute as issuer
    function addIssuer(address issuer) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ISSUER_ROLE, issuer);
    }

    // ✅ Issue Certificate
    function issueCertificate(
        string memory certificateId,
        string memory ipfsHash,
        address studentWallet
    ) public onlyRole(ISSUER_ROLE) {

        require(
            certificates[certificateId].issuedAt == 0,
            "Certificate already exists"
        );

        certificates[certificateId] = Certificate(
            certificateId,
            ipfsHash,
            studentWallet,
            false,
            block.timestamp
        );

        emit CertificateIssued(certificateId, ipfsHash, studentWallet);
    }

    // ✅ Revoke Certificate
    function revokeCertificate(string memory certificateId)
        public
        onlyRole(ISSUER_ROLE)
    {
        require(
            certificates[certificateId].issuedAt != 0,
            "Certificate not found"
        );

        certificates[certificateId].revoked = true;

        emit CertificateRevoked(certificateId);
    }

    // ✅ Verify Certificate
    function getCertificate(string memory certificateId)
        public
        view
        returns (
            string memory ipfsHash,
            address studentWallet,
            bool revoked,
            uint256 issuedAt
        )
    {
        Certificate memory cert = certificates[certificateId];

        require(cert.issuedAt != 0, "Certificate not found");

        return (
            cert.ipfsHash,
            cert.studentWallet,
            cert.revoked,
            cert.issuedAt
        );
    }
}
