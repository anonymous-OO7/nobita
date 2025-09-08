"use client";
import * as React from "react";
import { useState, useCallback, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Storage } from "megajs";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { CreateBlogApi } from "@/apis";

const WritePage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { makeApiCall } = useApi();

  const [megaStorage, setMegaStorage] = useState<any>(null);

  useEffect(() => {
    // Initialize MEGA storage once
    const storage = new Storage({
      email: "workist.ai@gmail.com",
      password: "Gaurav@123",
      userAgent: "WorkistBlog/1.0",
    });

    storage.on("ready", () => {
      console.log("✅ MEGA storage ready");
      setMegaStorage(storage);
    });

    (storage as any).on("error", (err: any) => {
      console.error("❌ MEGA error:", err);
      showToast("Failed to connect to MEGA.", { type: "error" });
    });

    // Clean up the event listener
    return () => {
      console.error("❌ MEGA error: Returnnn");
    };
  }, [showToast]);

  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("style");

  const [editorsPick, setEditorsPick] = useState<boolean>(false);
  const [mostPopular, setMostPopular] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<string>("");
  const [descError, setDescError] = useState<string>("");

  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!allowedTypes.includes(selectedFile.type)) {
        showToast("Only PNG, JPG, and JPEG files are allowed", {
          type: "error",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const validateFields = (): boolean => {
    let valid = true;
    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }
    if (!value.trim()) {
      setDescError("Description is required");
      valid = false;
    } else {
      setDescError("");
    }
    return valid;
  };

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!validateFields()) {
      return;
    }

    if (!megaStorage) {
      showToast("MEGA storage not ready yet. Try again.", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      let fileUrl: string | null = null;

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedFile = await megaStorage.upload(file.name, buffer, {
          size: buffer.length,
        }).complete;

        const exported = await uploadedFile.link();
        fileUrl = exported;
        console.log("✅ File uploaded to MEGA:", fileUrl);
      }

      await makeApiCall(
        CreateBlogApi(
          slugify(title),
          title,
          value,
          catSlug || "style",
          fileUrl,
          editorsPick,
          mostPopular
        )
      );

      showToast("Post created successfully", { type: "success" });
    } catch (error: any) {
      console.error("Upload or API error:", error);
      showToast(error.message || "Failed to create post", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [
    makeApiCall,
    showToast,
    router,
    title,
    value,
    catSlug,
    file,
    editorsPick,
    mostPopular,
    megaStorage,
    validateFields,
  ]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={`${styles.input} ${titleError ? styles.inputError : ""}`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && <div className={styles.errorText}>{titleError}</div>}

      <select
        className={styles.select}
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={editorsPick}
            onChange={(e) => setEditorsPick(e.target.checked)}
          />
          Editor's Pick
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={mostPopular}
            onChange={(e) => setMostPopular(e.target.checked)}
          />
          Most Popular
        </label>
      </div>

      <div className={styles.editor}>
        <button
          className={styles.button}
          type="button"
          onClick={() => setOpen(!open)}
        >
          <Image src="/plus.png" alt="add" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button className={styles.addButton} type="button">
              <label htmlFor="image">
                <Image src="/image.png" alt="upload" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton} type="button">
              <Image
                src="/external.png"
                alt="external"
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton} type="button">
              <Image src="/video.png" alt="video" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={`${styles.textArea} ${descError ? styles.inputError : ""}`}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
        {descError && <div className={styles.errorText}>{descError}</div>}
      </div>

      <button
        className={styles.publish}
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className={styles.loader} /> Publishing...
          </>
        ) : (
          "Publish"
        )}
      </button>
    </div>
  );
};

export default WritePage;
