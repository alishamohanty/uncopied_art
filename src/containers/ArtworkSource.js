// import React, { useRef, useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import "./Forms.css";
import "./ArtworkSource.css";
import {useAppContext} from "../libs/contextLib";
// import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import LoaderButton from "../app/components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";
import embossing from "../embossing.svg";

export default function ArtworkSource() {

    const [fields, handleFieldChange] = useFormFields({
        artworkName: "",
        artMedium: "",
        artworkSurface: "",
        width: "",
        height: "",
        labelTemplate:"",
        certificateLabel:"",
        assetLabel:"",
        metadataTemplate:"",
        editionTotal:1,
    });

    // const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [artworkSource, setArtworkSource] = useState(null);

    const {isAuthenticated} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    function isLimitedEdition() {
        if( ! fields.labelTemplate.includes("Limited") ) {
            fields.editionTotal=1;
            fields.certificateLabel="{{.AssetName}} by {{.IssuerName}}, {{.CurrentYear}} (Unique Original)";
            fields.assetLabel="{{.AssetName}}";
            fields.metadataTemplate="    {\n" +
                "      \"@context\": \"https://schema.org\",\n" +
                "      \"@type\": \"VisualArtwork\",\n" +
                "      \"name\": \"{{.AssetName}}\",\n" +
                "      \"image\": \"{{.ThumbnailURL}}\",\n" +
                "      \"description\": \"{{.CertificateLabel}}\",\n" +
                "      \"creator\": [\n" +
                "        {\n" +
                "          \"@type\": \"Person\",\n" +
                "          \"name\": \"{{.IssuerName}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"width\": [\n" +
                "        {\n" +
                "          \"@type\": \"Distance\",\n" +
                "          \"name\": \"{{.AssetProperties.Width}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"height\": [\n" +
                "        {\n" +
                "          \"@type\": \"Distance\",\n" +
                "          \"name\": \"{{.AssetProperties.Height}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"artMedium\": \"{{.AssetProperties.ArtMedium}}\",\n" +
                "      \"artworkSurface\": \"{{.AssetProperties.ArtworkSurface}}\"\n" +
                "    }";
            return false
        } else {
            fields.certificateLabel="{{.AssetName}} by {{.IssuerName}}, {{.CurrentYear}} ({{.EditionNumber}} / {{.EditionTotal}})";
            fields.assetLabel="{{.AssetName}} {{.EditionNumber}}/{{.EditionTotal}}";
            fields.metadataTemplate="";
            fields.metadataTemplate="    {\n" +
                "      \"@context\": \"https://schema.org\",\n" +
                "      \"@type\": \"VisualArtwork\",\n" +
                "      \"name\": \"{{.AssetName}}\",\n" +
                "      \"image\": \"{{.ThumbnailURL}}\",\n" +
                "      \"description\": \"{{.CertificateLabel}}\",\n" +
                "      \"creator\": [\n" +
                "        {\n" +
                "          \"@type\": \"Person\",\n" +
                "          \"name\": \"{{.IssuerName}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"width\": [\n" +
                "        {\n" +
                "          \"@type\": \"Distance\",\n" +
                "          \"name\": \"{{.AssetProperties.Width}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"height\": [\n" +
                "        {\n" +
                "          \"@type\": \"Distance\",\n" +
                "          \"name\": \"{{.AssetProperties.Height}}\"\n" +
                "        }\n" +
                "      ],\n" +
                "      \"artEdition\": \"{{.EditionTotal}}\",\n" +
                "      \"position\": \"{{.EditionNumber}}\",\n" +
                "      \"artMedium\": \"{{.AssetProperties.ArtMedium}}\",\n" +
                "      \"artworkSurface\": \"{{.AssetProperties.ArtworkSurface}}\"\n" +
                "    }";
            return true
        }
    }

    function validateForm() {
        return (
            fields.artworkName.length > 0 &&
            fields.editionTotal > 0
        );
    }

    useEffect(() => {
        async function onLoad() {
            setIsLoading(true);
            if (!isAuthenticated) {
                return;
            }
            try {
                const artworkSource = await loadArtworkSource({id});
                console.log("artworkSource = "+artworkSource )
                setArtworkSource(artworkSource);
            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }
        onLoad();
    }, [isAuthenticated,id]);


    function loadArtworkSource(sourceId) {
        return new Promise(resolve => {
            try {
                // Sending and receiving data in JSON format using POST method
                //
                var xhr = new XMLHttpRequest();
                var url = process.env.REACT_APP_UNCOPIED_API+"api/v1.0/src/"+sourceId.id;
                console.log(url)
                xhr.open("GET", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("jwtoken"));
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var json = JSON.parse(xhr.responseText);
                        if (json == null) {
                            alert("Could not get src, json is null");
                        } else {
                            console.log(json);
                            resolve(json)
                        }
                    } else {
                        alert("Could not get src " + xhr.status);
                    }
                };
                /*
                "source_license":"CC-BY 4.0",
                "ipfs_hash":"QmZFmZfRcspTtgUk7EDZNofTMJiCUh7ffhU6kd3ycNbWDi"
                */
                xhr.send();
            } catch (e) {
                onError(e);
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        try {
            // Sending and receiving data in JSON format using POST method
            //
            var xhr = new XMLHttpRequest();
            var url = process.env.REACT_APP_UNCOPIED_API+"api/v1.0/asset/";
            xhr.open("POST", url, true	);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("jwtoken"));
            xhr.onload = function () {
                if ( xhr.status === 200 ) {
                    var json = JSON.parse(xhr.responseText);
                    if( json==null ) {
                        alert("Could not read asset template");
                    } else {
                        console.log("got asset template "+json);
                        // local Storage.setItem('assetTemplateID', json.Template.ID);
                        history.push("/cert/new/"+parseInt(json.Template.ID.valueOf()));
                    }
                } else {
                    alert("Could not create asset template");
                }
                setIsLoading(false);
            };
            var data = JSON.stringify(
                {"name": fields.artworkName, "certificate_label": fields.certificateLabel,
                    "asset_label": fields.assetLabel, "edition_total": parseInt(fields.editionTotal),
                    "metadata":fields.metadataTemplate,
                    "asset_properties" : {
                        "ArtMedium":fields.artMedium,
                        "ArtworkSurface":fields.artworkSurface,
                        "Width":fields.width,
                        "Height":fields.height,
                    },
                    "source_id": parseInt(id)});
            console.log("create asset data = "+data)
            xhr.send(data);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderArtworkSource() {
        return (
            <div className="form-container-outer">
                <div className="form-container-inner">
                    <div>
                        <img className="embossing" src={embossing} alt="embossing" />
                        <h2 align="center">CREATE EDITION</h2>
                        <p>
                            Your edition information (also called 'metadata') will appear in the certificate of authenticity. There are specific constraints
                            on the length of names and labels, that will be verified during the certificate creation. We recommend a short and distinctive name.
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="artworkName" size="lg">
                            <Form.Label>Artwork name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.artworkName}
                                onChange={handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="labelTemplate">
                            <Form.Label>Choose type of certificate</Form.Label>
                            <Form.Control as="select"  onChange={handleFieldChange} value={fields.labelTemplate} >
                                <option value="UC-SingleOriginal">Single Original (Uncopied Template)</option>
                                <option value="UC-LimitedEdition">Limited Edition of 1/N Original Copies (Uncopied Template)</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="editionTotal" size="lg" >
                            <Form.Label>Edition total</Form.Label>
                            <Form.Control
                                autoFocus
                                type="number"   min={1} max={30}
                                value={fields.editionTotal}
                                onChange={handleFieldChange}
                                disabled={!isLimitedEdition()}
                            />
                        </Form.Group>
                        <Form.Group controlId="artMedium">
                            <Form.Label>Art medium</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.artMedium}
                                onChange={handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="artworkSurface">
                            <Form.Label>Artwork surface</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.artworkSurface}
                                onChange={handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="width">
                            <Form.Label>Width</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.width}
                                onChange={handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="height">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.height}
                                onChange={handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="certificateLabel" size="lg">
                            <Form.Label>Certificate label preview (max length : 128)</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.certificateLabel}
                                onChange={handleFieldChange}
                                disabled={true}
                            />
                        </Form.Group>
                        <Form.Group controlId="assetLabel" size="lg">
                            <Form.Label>Asset label preview (max length : 32)</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={fields.assetLabel}
                                onChange={handleFieldChange}
                                disabled={true}
                            />
                        </Form.Group>
                        <Form.Group controlId="metadataTemplate" size="lg">

                            <Form.Label>Metadata template</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea"
                                type="text"
                                plaintext="true"
                                value={fields.metadataTemplate}
                                onChange={handleFieldChange}
                                disabled={true}
                            />
                        </Form.Group>
                        <LoaderButton
                            block
                            type="submit"
                            size="lg"
                            variant="primary"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Create New Edition
                        </LoaderButton>
                    </Form>
                    <p>
                        Creating several editions for a same artwork may deteriorate your brand as an artist, or even conflict
                        with the promise you made in earlier edition. Please, don't hesitate to
                        <a href="https://calendly.com/namsor/uncopied_art" target="top"> schedule a free chat </a> with an advisor.
                    </p>
                    <div className="ArtworkSource">
                   <span className="font-weight-bold">
                       <img className="thumbnail" src={`${process.env.REACT_APP_UNCOPIED_IPFS}${artworkSource.IPFSHashThumbnail}`} alt={`${new Date(artworkSource.CreatedAt).toLocaleString()} ${artworkSource.SourceLicense}`}/>
                       <figcaption className="thumbnailCaption">{new Date(artworkSource.CreatedAt).toLocaleString()} {artworkSource.SourceLicense}</figcaption>
                   </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated && !isLoading ? renderArtworkSource() : <p>Please sign-in</p>}
        </div>
    );

}