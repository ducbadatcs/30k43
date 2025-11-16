<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const inputFile = ref<HTMLInputElement | undefined>(undefined);
const selectedFileName = ref<string>("");
const uploadStatus = ref<string>("");
const isUploading = ref<boolean>(false);

class FileData {
  name: string = "";
  size: number = 0;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  public convertFileSize(): string {
    if (this.size < 1000) {
      return `${this.size} B`;
    } else if (this.size < 1000000) {
      return `${(this.size / 1000).toFixed(1)} KB`;
    } else {
      return `${(this.size / 1000000).toFixed(2)} MB`;
    }
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0 && target.files[0]) {
    selectedFileName.value = target.files[0].name;
    uploadStatus.value = ""; // Clear previous status
  }
};

const files = ref<FileData[]>([]);

const fetchFiles = async () => {
  try {
    const data = await axios.get("http://localhost:8000/files").then((response) => {
      return response.data;
    });
    console.log(data);
    files.value = data.map((file: any) => new FileData(file.name, file.size));
  } catch (error: any) {
    console.error("Retrieve error:", error);
  }
};

const handleFileUpload = async (event: Event) => {
  event.preventDefault();
  if (!inputFile.value?.files || inputFile.value.files.length === 0) {
    uploadStatus.value = "Please select a file first";
    return;
  }
  const file = inputFile.value.files[0];
  const formData = new FormData();
  formData.append("file", file as Blob);

  isUploading.value = true;
  uploadStatus.value = "Uploading...";

  try {
    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    uploadStatus.value = `Success! ${response.data.message || "File uploaded"}`;
    console.log("Upload successful:", response.data);

    // Clear the file input after successful upload
    if (inputFile.value) {
      inputFile.value.value = "";
      selectedFileName.value = "";
    }
    await fetchFiles();
  } catch (error: any) {
    uploadStatus.value = `Error: ${error.response?.data?.detail || error.message || "Upload failed"}`;
    console.error("Upload error:", error);
  } finally {
    isUploading.value = false;
  }

  // get data
  try {
    const data = await axios.get("http://localhost:8000/files").then((response) => {
      return response.data;
    });
    console.log(data);
    files.value = data;
  } catch (error: any) {
    console.error("Retrieve error:", error);
  } finally {
  }
};

// get files
onMounted(async () => {
  await fetchFiles();
});
</script>

<template>
  <div class="border-bottom">
    <form @submit="handleFileUpload" method="post" enctype="multipart/form-data">
      <input
        type="file"
        name="inputFile"
        id="input-file"
        ref="inputFile"
        @change="handleFileChange"
      /><br />
      <button
        type="submit"
        class="btn btn-primary btn-sm w-100"
        :disabled="isUploading || !selectedFileName"
      >
        {{ isUploading ? "Uploading..." : "Upload" }}
      </button>
    </form>
  </div>
  <div>
    <!-- get uploaded files -->
    <table class="table">
      <thead>
        <tr>
          <th>Uploaded File</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, i) in files" :key="i">
          <td>{{ file.name }}</td>
          <td>{{ file.convertFileSize() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
